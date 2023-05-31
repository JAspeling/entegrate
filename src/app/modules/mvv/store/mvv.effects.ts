import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { MvvActions, MvvSelectors } from "./index";
import { concatMap, map, mergeMap, tap } from "rxjs";
import { IMvvService } from "../mvv-service";
import { AppActions } from "../../../state";
import { AppState } from "../../../state/app.state";
import { Store } from "@ngrx/store";
import { TimelineActions } from "../../timeline/state";

@Injectable()
export class MvvEffects {

  getOrUpdateSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(MvvActions.getConfigSuccess, MvvActions.updateSuccess),
      tap((action) => {
        this.store.dispatch(AppActions.updateCurrentTime({
            component: 'mvv',
            currentTime: action.done ? action.time : 0
          })
        )
        this.store.dispatch(AppActions.updateTotalTime({ component: 'mvv', totalTime: action.time }))
      }),
      mergeMap((action) => this.store.select(MvvSelectors.getState)),
      tap(state =>
        this.store.dispatch(TimelineActions.updateEvent(state))
      )
    ), { dispatch: false }
  )

  getConfig$ = createEffect(() => this.actions$
    .pipe(
      ofType(MvvActions.getConfig),
      mergeMap(() => this.service.getSaved()
        .pipe(
          map((options) => MvvActions.getConfigSuccess(options))
        ),
      )
    )
  )

  update$ = createEffect(() => this.actions$
    .pipe(
      ofType(MvvActions.update),
      concatMap((action) => this.service.update(action)
        .pipe(
          map((options) => MvvActions.updateSuccess(options))
        )
      )
    )
  )

  constructor(private actions$: Actions,
    private readonly store: Store<AppState>,
    private readonly service: IMvvService) {
  }
}
