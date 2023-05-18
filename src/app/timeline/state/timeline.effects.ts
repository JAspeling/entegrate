import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TimelineService } from "../timeline.service";
import * as TimelineActions from "./timeline.actions";
import { map, mergeMap } from "rxjs";
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

  constructor(private actions$: Actions, private readonly timelineService: TimelineService) {

  }
}
