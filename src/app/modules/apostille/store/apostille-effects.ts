import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { getSaved, getSavedSuccess, update, updateSuccess } from "./apostille.actions";
import { concatMap, map, mergeMap, tap } from "rxjs";
import { AppActions } from "../../../state";
import { AppState } from "../../../state/app.state";
import { Store } from "@ngrx/store";
import { IApostilleService } from "../apostille-service";
import { TimelineActions } from "../../timeline/state";
import { ApostilleActions, ApostilleSelectors } from "./index";

@Injectable()
export class ApostilleEffects {
  getOrUpdateSuccess$ = createEffect(() => this.actions$.pipe(
      ofType(getSavedSuccess, updateSuccess),
      tap((action) => {
        // emit to the appState
        this.store.dispatch(AppActions.updateCurrentTime({
          component: 'apostille',
          currentTime: action.done ? action.time : 0
        }))
        this.store.dispatch(AppActions.updateTotalTime({ component: 'apostille', totalTime: action.time }))
        this.store.dispatch(TimelineActions.updateEvent({  id: action.id, done: action.done }));
      }),
      mergeMap((action) => this.store.select(ApostilleSelectors.getState)),
      tap(state =>
        this.store.dispatch(TimelineActions.updateEvent({  id: state.id, done: state.done }))
      )
    ),
    { dispatch: false }
  )

  update$ = createEffect(() => this.actions$
    .pipe(
      ofType(update),
      concatMap((action) => this.apostilleService.update(action)
        .pipe(
          map((options) => updateSuccess(options))
        )
      )
    )
  )

  get$ = createEffect(() => this.actions$
    .pipe(
      ofType(getSaved),
      concatMap(() => this.apostilleService.getSaved()
        .pipe(
          map((options) => getSavedSuccess(options))
        )
      )
    )
  )

  setId$ = createEffect(() => this.actions$
    .pipe(
      ofType(TimelineActions.loadEventsSuccess),
      tap((events) =>
        this.store.dispatch(ApostilleActions.setId({
          id: events.events
            .find((event) => event.title.toLowerCase() === 'apostille documents')
            .id
        }))
      )
    ), { dispatch: false }
  )

  constructor(private readonly actions$: Actions,
    private readonly store: Store<AppState>,
    private readonly apostilleService: IApostilleService) {

  }
}
