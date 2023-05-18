import { Injectable } from "@angular/core";
import { IUnabridgedService } from "../unabridged.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as UnabridgedActions from "./unabridged.actions";
import { catchError, concatMap, map, of } from "rxjs";

@Injectable()
export class UnabridgedEffects {
  $updateOptions = createEffect(() => this.actions$
    .pipe(
      ofType(UnabridgedActions.updateUnabridgedOptions),
      concatMap((action) =>
        this.unabridgedService.updateOptions(action.options).pipe(
          map((options) => UnabridgedActions.updateUnabridgedOptionsSuccess({ options })),
          catchError(error => of(UnabridgedActions.updateUnabridgedOptionsFailure({ error })))
        )
      )
    )
  )

  $getOptions = createEffect(() => this.actions$.pipe(
    ofType(UnabridgedActions.getUnabridgedOptions),
    concatMap(() => this.unabridgedService.getOptions().pipe(
      map((options) => UnabridgedActions.updateUnabridgedOptionsSuccess({ options })),
      catchError(error => of(UnabridgedActions.updateUnabridgedOptionsFailure({ error })))
    ))
  ))

  constructor(private readonly actions$: Actions, private readonly unabridgedService: IUnabridgedService) {

  }

}
