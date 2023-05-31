import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { concatMap, map, mergeMap, tap } from "rxjs";
import { AppActions } from "../../../state";
import { TimelineActions } from "../../timeline/state";
import { PetsActions, PetsSelectors } from "./index";
import { IPetsService } from "../pets.service";
import { AppState } from "../../../state/app.state";
import { Store } from "@ngrx/store";

@Injectable()
export class PetsEffects {
  getOrUpdateSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(PetsActions.getConfigSuccess, PetsActions.updateSuccess),
      tap((action) => {
        this.store.dispatch(AppActions.updateCurrentTime({
            component: 'pets',
            currentTime: action.done ? action.time : 0
          })
        )
        this.store.dispatch(AppActions.updateTotalTime({ component: 'pets', totalTime: action.time }))
      }),
      mergeMap((action) => this.store.select(PetsSelectors.getState)),
      tap(state =>
        this.store.dispatch(TimelineActions.updateEvent(state))
      )
    ), { dispatch: false }
  )

  getConfig$ = createEffect(() => this.actions$
    .pipe(
      ofType(PetsActions.getConfig),
      mergeMap(() => this.service.getSaved()
        .pipe(
          map((options) => PetsActions.getConfigSuccess(options))
        ),
      )
    )
  )

  update$ = createEffect(() => this.actions$
    .pipe(
      ofType(PetsActions.update),
      concatMap((action) => this.service.update(action)
        .pipe(
          map((options) => PetsActions.updateSuccess(options))
        )
      )
    )
  )

  constructor(private readonly actions$: Actions,
    private readonly store: Store<AppState>,
    private readonly service: IPetsService) {
  }
}
