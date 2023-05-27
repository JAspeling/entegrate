import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { IProcessInformationService } from "../process-information.service";
import { concatMap, map, mergeMap, take, tap } from "rxjs";
import { ProcessInfoActions, ProcessInfoSelectors } from "./index";
import { AppState } from "../../../state/app.state";
import { Store } from "@ngrx/store";

@Injectable()
export class ProcessInformationStoreEffects {
  update$ = createEffect(
    () => this.actions$.pipe(
      ofType(ProcessInfoActions.updateProcessInformation),
      concatMap((action) =>
        this.service.update(action).pipe(
          map((options) => ProcessInfoActions.updateProcessInformationSuccess( action ))
        )
      )
    ), {
      dispatch: false
    }
  )

  updateWithoutNotifying$ = createEffect(
    () => this.actions$.pipe(
      ofType(ProcessInfoActions.updateProcessInformationWithoutNotifying),
      concatMap((action) =>
        this.service.update(action)
      )
    ), {
      dispatch: false
    }
  )

  toggle$ = createEffect(
    () => this.actions$.pipe(
      ofType(ProcessInfoActions.toggleProcessInformation),
      mergeMap((action) => this.store.select(ProcessInfoSelectors.getProcessInformation).pipe(take(1))),
      tap((state) => {
        this.store.dispatch(ProcessInfoActions.updateProcessInformationWithoutNotifying(state))
      })
    ), { dispatch: false }
  )

  getOptions$ = createEffect(
    () => this.actions$.pipe(
      ofType(ProcessInfoActions.getProcessInformation),
      concatMap(() => this.service.getSaved()
        .pipe(
          map((state) => ProcessInfoActions.getProcessInformationSuccess(state))
        )
      )
    )
  )

  constructor(private actions$: Actions,
    private service: IProcessInformationService,
    private readonly store: Store<AppState>
    ) {

  }
}
