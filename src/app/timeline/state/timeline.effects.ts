import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TimelineService } from "../timeline.service";
import * as TimelineActions from "./timeline.actions";
import { catchError, concatMap, map, mergeMap, of } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class TimelineEffects {
  loadTimeline$ = createEffect(() => this.actions$.pipe(
      ofType(TimelineActions.loadEvents),
      mergeMap(() => this.timelineService.getProducts()
        .pipe(
          map(events => TimelineActions.loadEventsSuccess({ events }))
        )
      )
    )
  );

  setCurrentEvent$ = createEffect(() => this.actions$.pipe(
      ofType(TimelineActions.setCurrent),
      concatMap((action) =>
        this.timelineService.setCurrentId(action.eventId).pipe(
          map(id => TimelineActions.setCurrentSuccess({ eventId: id })),
          catchError(error => of(TimelineActions.loadEventsFailure({ error })))
        )
      )
    )
  )

  getCurrentEvent$ = createEffect(() => this.actions$.pipe(
      ofType(TimelineActions.getCurrent),
      mergeMap(() => this.timelineService.getCurrentId().pipe(
        map(id => TimelineActions.getCurrentSuccess({ eventId: id })),
      ))
    )
  )

  clearCurrentEvent$ = createEffect(() => this.actions$.pipe(
      ofType(TimelineActions.clearCurrentEvent),
      mergeMap(() => this.timelineService.setCurrentId(null)
        .pipe(
          map(() => TimelineActions.clearCurrentEventSuccess())
        )
      )
    )
  )

  constructor(private actions$: Actions, private readonly timelineService: TimelineService) {

  }
}
