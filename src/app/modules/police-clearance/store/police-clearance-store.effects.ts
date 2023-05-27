import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { PoliceClearanceActions, PoliceClearanceSelectors } from "./index";
import { concatMap, map, mergeMap, tap } from "rxjs";
import { IPoliceClearanceService } from "../police-clearance.service";
import { AppActions } from "../../../state";
import { AppState } from "../../../state/app.state";
import { Store } from "@ngrx/store";
import { TimelineActions } from "../../timeline/state";

@Injectable()
export class PoliceClearanceStoreEffects {
  getOrUpdateSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(
        PoliceClearanceActions.getSavedSuccess,
        PoliceClearanceActions.updateSuccess
      ),
      tap((action) => {
        // emit to the appState
        this.store.dispatch(AppActions.updateCurrentTime({
          component: 'police-clearance',
          currentTime: action.done ? action.time : 0
        }));
        this.store.dispatch(AppActions.updateTotalTime({
          component: 'police-clearance', totalTime: action.time
        }));
      }),
      mergeMap((action) => this.store.select(PoliceClearanceSelectors.getState)),
      tap(state =>
        this.store.dispatch(TimelineActions.updateEvent({  id: state.id, done: state.done }))
      )
    ), { dispatch: false }
  );

  $update = createEffect(() => this.actions$
    .pipe(
      ofType(PoliceClearanceActions.update),
      concatMap((action) => this.service.update(action)
        .pipe(
          tap((options) => {
            this.store.dispatch(TimelineActions.updateEvent({  id: '3', done: action.done }));
          }),
          map((options) => PoliceClearanceActions.updateSuccess(options))
        )
      )
    )
  );

  get$ = createEffect(() => this.actions$
    .pipe(
      ofType(PoliceClearanceActions.getSaved),
      concatMap(() => this.service.getSaved()
        .pipe(
          map((options) => PoliceClearanceActions.getSavedSuccess(options))
        )
      )
    )
  )

  setId$ = createEffect(() => this.actions$
    .pipe(
      ofType(TimelineActions.loadEventsSuccess),
      tap((events) =>
        this.store.dispatch(PoliceClearanceActions.setId({
          id: events.events
            .find((event) => event.title.toLowerCase() === 'police clearance')
            .id
        }))
      )
    ), { dispatch: false }
  )

  constructor(private readonly actions$: Actions, private service: IPoliceClearanceService,
    private store: Store<AppState>) {
  }
}
