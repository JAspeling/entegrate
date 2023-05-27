import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { AppState } from "../../../state/app.state";
import { Store } from "@ngrx/store";
import { GatherDocsActions, GatherDocsSelectors } from "./index";
import { concatMap, map, mergeMap, tap } from "rxjs";
import { IGatherDocsService } from "../gather-document.service";
import { AppActions } from "../../../state";
import { TimelineActions } from "../../timeline/state";

@Injectable()
export class GatherDocumentsEffects {
  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GatherDocsActions.updateConfig),
      concatMap((action) => this.service.update(action)
        .pipe(
          map((options) => GatherDocsActions.updateConfigSuccess(options))
        )
      )
    )
  )

  get$ = createEffect(() => this.actions$
    .pipe(
      ofType(GatherDocsActions.getConfig),
      concatMap(() => this.service.getSaved()
        .pipe(
          map((options) => GatherDocsActions.getConfigSuccess(options))
        )
      )
    )
  )

  getOrUpdateSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(
        GatherDocsActions.getConfigSuccess,
        GatherDocsActions.updateConfigSuccess
      ),
      tap((action) => {
        // emit to the appState
        this.store.dispatch(AppActions.updateCurrentTime({
          component: 'gather-docs',
          currentTime: action.done ? action.time : 0
        }));
        this.store.dispatch(AppActions.updateTotalTime({
          component: 'gather-docs', totalTime: action.time
        }));
      }),
      mergeMap((action) => this.store.select(GatherDocsSelectors.getState)),
      tap(state =>
        this.store.dispatch(TimelineActions.updateEvent({  id: state.id, done: state.done }))
      )
    ), { dispatch: false }
  );

  setId$ = createEffect(() => this.actions$
    .pipe(
      ofType(TimelineActions.loadEventsSuccess),
      tap((events) =>
        this.store.dispatch(GatherDocsActions.setId({
          id: events.events
            .find((event) => event.title.toLowerCase() === 'gather documents')
            .id
        }))
      )
    ), { dispatch: false }
  )

  constructor(private actions$: Actions,
    private store: Store<AppState>,
    private readonly service: IGatherDocsService) {
  }
}
