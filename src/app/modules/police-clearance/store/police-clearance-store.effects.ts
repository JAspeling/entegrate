import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { PoliceClearanceActions } from "./index";
import { concatMap, map, tap } from "rxjs";
import { IPoliceClearanceService } from "../police-clearance.service";
import { AppActions } from "../../../state";
import { AppState } from "../../../state/app.state";
import { Store } from "@ngrx/store";

@Injectable()
export class PoliceClearanceStoreEffects {
  updateOrRetrieveSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(
        PoliceClearanceActions.getSavedSuccess,
        PoliceClearanceActions.updateSuccess
      ),
      tap((action) => {
        // emit to the appState
        this.appStore.dispatch(AppActions.updateCurrentTime({
          component: 'police-clearance',
          currentTime: action.done ? action.time : 0
        }))
        this.appStore.dispatch(AppActions.updateTotalTime({
          component: 'police-clearance', totalTime: action.time
        }))
      })
    ), { dispatch: false }
  );

  $update = createEffect(() => this.actions$
    .pipe(
      ofType(PoliceClearanceActions.update),
      concatMap((action) => this.service.update(action)
        .pipe(
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

  constructor(private readonly actions$: Actions, private service: IPoliceClearanceService,
    private appStore: Store<AppState>) {
  }
}
