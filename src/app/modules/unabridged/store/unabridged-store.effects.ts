import { Injectable } from "@angular/core";
import { IUnabridgedService } from "../unabridged.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as UnabridgedActions from "./unabridged-store.actions";
import { catchError, concatMap, map, of, tap } from "rxjs";
import { AppState } from "../../../state/app.state";
import { Store } from "@ngrx/store";
import { AppActions } from "../../../state";
import { TimelineActions } from "../../timeline/state";

@Injectable()
export class UnabridgedStoreEffects {
  updateOptions$ = createEffect(() => this.actions$
    .pipe(
      ofType(UnabridgedActions.updateConfig),
      concatMap((action) =>
        this.unabridgedService.updateOptions(action).pipe(
          map((options) => UnabridgedActions.updateConfigSuccess(options)),
          catchError(error => of(UnabridgedActions.actionFailure({ error })))
        )
      )
    )
  )

  getOrUpdateConfigSuccess$ = createEffect(() => this.actions$.pipe(
      ofType(UnabridgedActions.updateConfigSuccess, UnabridgedActions.getConfigSuccess),
      tap((action) => {
        this.appStore.dispatch(AppActions.updateCurrentTime({
          component: 'unabridged',
          currentTime: action.done ? action.time : 0
        }))
        this.appStore.dispatch(AppActions.updateTotalTime({ component: 'unabridged', totalTime: action.time }));
        this.appStore.dispatch(TimelineActions.updateEvent({  id: '1', done: action.done }));
      })
    ), { dispatch: false }
  )

  getOptions$ = createEffect(() => this.actions$.pipe(
    ofType(UnabridgedActions.getConfig),
    concatMap(() => this.unabridgedService.getOptions().pipe(
      map((options) => UnabridgedActions.getConfigSuccess(options)),
      catchError(error => of(UnabridgedActions.actionFailure({ error })))
    ))
  ))

  constructor(private readonly actions$: Actions,
    private readonly unabridgedService: IUnabridgedService,
    private readonly appStore: Store<AppState>) {

  }

}
