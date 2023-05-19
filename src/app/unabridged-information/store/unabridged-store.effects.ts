import { Injectable } from "@angular/core";
import { IUnabridgedService } from "../unabridged.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as UnabridgedActions from "./unabridged-store.actions";
import { catchError, concatMap, map, of, share } from "rxjs";

@Injectable()
export class UnabridgedStoreEffects {
  updateOptions$ = createEffect(() => this.actions$
    .pipe(
      ofType(UnabridgedActions.updateOptions),
      concatMap((action) =>
        this.unabridgedService.updateOptions(action.options).pipe(
          map((options) => UnabridgedActions.updateUOptionsSuccess({ options })),
          catchError(error => of(UnabridgedActions.actionFailure({ error })))
        )
      )
    )
  )

  getOptions$ = createEffect(() => this.actions$.pipe(
    ofType(UnabridgedActions.getOptions),
    concatMap(() => this.unabridgedService.getOptions().pipe(
      map((options) => UnabridgedActions.getOptionsSuccess({ options })),
      catchError(error => of(UnabridgedActions.actionFailure({ error })))
    ))
  ))

  constructor(private readonly actions$: Actions, private readonly unabridgedService: IUnabridgedService) {

  }

}
