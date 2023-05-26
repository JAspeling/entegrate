import { Injectable } from "@angular/core";
import { IUnabridgedService } from "../unabridged.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as UnabridgedActions from "./unabridged-store.actions";
import { catchError, concatMap, map, of, tap } from "rxjs";
import { AppState } from "../../../state/app.state";
import { Store } from "@ngrx/store";
import { AppActions } from "../../../state";

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

  updateConfigSuccess$ = createEffect(() => this.actions$.pipe(
      ofType(UnabridgedActions.updateConfigSuccess, UnabridgedActions.getConfigSuccess),
      tap((action) => {
        if (action.done) {
          this.appStore.dispatch(AppActions.updateCurrentTime({ currentTime: action.time }))
        } else {
          this.appStore.dispatch(AppActions.updateTotalTime({ totalTime: action.time }))
          this.appStore.dispatch(AppActions.updateCurrentTime({ currentTime: 0 }))
        }
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
