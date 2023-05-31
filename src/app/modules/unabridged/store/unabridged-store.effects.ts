import { Injectable } from "@angular/core";
import { IUnabridgedService } from "../unabridged.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as UnabridgedActions from "./unabridged-store.actions";
import { catchError, concatMap, map, mergeMap, of, tap } from "rxjs";
import { AppState } from "../../../state/app.state";
import { Store } from "@ngrx/store";
import { AppActions } from "../../../state";
import { TimelineActions } from "../../timeline/state";
import { UnabridgedStoreSelectors } from "./index";

@Injectable()
export class UnabridgedStoreEffects {
  updateOptions$ = createEffect(() => this.actions$
    .pipe(
      ofType(UnabridgedActions.updateConfig),
      concatMap((action) =>
        this.unabridgedService.update(action).pipe(
          map((options) => UnabridgedActions.updateConfigSuccess(options)),
          catchError(error => of(UnabridgedActions.actionFailure({ error })))
        )
      )
    )
  )

  getOrUpdateConfigSuccess$ = createEffect(() => this.actions$.pipe(
      ofType(UnabridgedActions.updateConfigSuccess, UnabridgedActions.getConfigSuccess),
      tap((action) => {
        this.store.dispatch(AppActions.updateCurrentTime({
          component: 'unabridged',
          currentTime: action.done ? action.time : 0
        }))
        this.store.dispatch(AppActions.updateTotalTime({ component: 'unabridged', totalTime: action.time }));
      }),
      mergeMap((action) => this.store.select(UnabridgedStoreSelectors.getState)),
      tap(state =>
        this.store.dispatch(TimelineActions.updateEvent({  id: state.id, done: state.done, time: state.time }))
      )
    ), { dispatch: false }
  )

  getOptions$ = createEffect(() => this.actions$.pipe(
    ofType(UnabridgedActions.getConfig),
    concatMap(() => this.unabridgedService.getSaved().pipe(
      map((options) => UnabridgedActions.getConfigSuccess(options)),
      catchError(error => of(UnabridgedActions.actionFailure({ error })))
    ))
  ))

  constructor(private readonly actions$: Actions,
    private readonly unabridgedService: IUnabridgedService,
    private readonly store: Store<AppState>) {

  }

}
