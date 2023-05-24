import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { IProcessInformationService } from "../process-information.service";
import {
  getProcessInformation,
  getProcessInformationSuccess,
  updateProcessInformation
} from "./process-information-store.actions";
import { concatMap, map, share, take } from "rxjs";
import { ProcessInfoActions } from "./index";

@Injectable()
export class ProcessInformationStoreEffects {
  update$ = createEffect(
    () => this.actions$.pipe(
      ofType(ProcessInfoActions.updateProcessInformation),
      concatMap((action) =>
        this.service.updateOptions(action.options).pipe(
          map((options) => ProcessInfoActions.updateProcessInformation({ options }))
        )
      )
    ), {
      dispatch: false
    }
  )

  getOptions$ = createEffect(
    () => this.actions$.pipe(
      ofType(ProcessInfoActions.getProcessInformation),
      concatMap(() => this.service.getOptions()
        .pipe(
          map((options) => ProcessInfoActions.getProcessInformationSuccess({ options }))
        )
      )
    )
  )

  constructor(private actions$: Actions, private service: IProcessInformationService,
    ) {

  }
}
