import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { getSaved, getSavedSuccess, update, updateSuccess } from "./apostille.actions";
import { concatMap, map, tap } from "rxjs";
import { AppActions } from "../../../state";
import { AppState } from "../../../state/app.state";
import { Store } from "@ngrx/store";
import { IApostilleService } from "../apostille-service";

@Injectable()
export class ApostilleEffects {
  updateOrRetrieveSuccess$ = createEffect(() => this.actions$.pipe(
      ofType(getSavedSuccess, updateSuccess),
      tap((action) => {
        // emit to the appState
        this.appStore.dispatch(AppActions.updateCurrentTime({
          component: 'apostille',
          currentTime: action.done ? action.time : 0
        }))
        this.appStore.dispatch(AppActions.updateTotalTime({ component: 'apostille', totalTime: action.time }))
      }),
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

  constructor(private readonly actions$: Actions, private readonly appStore: Store<AppState>,
    private readonly apostilleService: IApostilleService) {

  }
}
