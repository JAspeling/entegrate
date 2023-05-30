import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TimelineService } from "../timeline.service";
import * as TimelineActions from "./timeline.actions";
import { catchError, concatMap, distinctUntilChanged, map, mergeMap, of, take } from "rxjs";
import { Injectable } from "@angular/core";
import { AppState } from "../../../state/app.state";
import { Store } from "@ngrx/store";
import { TimelineSelectors } from "./index";
import { CustomTimelineEvent } from "../../../shared/models/timeline-event.interface";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

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

  updateTimestamps$ = createEffect(() => this.actions$.pipe(
    ofType(TimelineActions.updateTimestamps),
    mergeMap((action) => this.store.select(TimelineSelectors.getEvents)
      .pipe(
        take(1),
        distinctUntilChanged(),
        map((events) => this.updateEventDates(events, action.initialDate))
      )
    ),
    map((events) => TimelineActions.updateEvents({ events }))
  ))

  updateEvent$ = createEffect(() => this.actions$
    .pipe(
      ofType(TimelineActions.updateEvent),
      mergeMap((action) => this.store.select(TimelineSelectors.getEvents)
        .pipe(
          take(1),
          distinctUntilChanged(),
          map((events) => {
            const event = events.find(event => event.id === action.id);
            return {
              events,
              event,
              index: events.indexOf(event)
            }
          })
        )
      ),
      map((value) => {
        // Update all the consecutive events, including this one.
        const startDate = {
          year: value.event.timestamp.getFullYear(),
          month: value.event.timestamp.getMonth() + 1,
          day: value.event.timestamp.getDate()
        }
        return this.updateEventDates(value.events, startDate, value.index)
      }),
      map((events) => TimelineActions.updateEvents({ events }))
    )
  )

  constructor(private actions$: Actions,
    private readonly timelineService: TimelineService, private readonly store: Store<AppState>) {

  }

  private addWeeks(date: Date, weeks: number): Date {
    const newDate = new Date(date);
    newDate.setUTCHours(0, 0, 0, 0);
    const currentDay = newDate.getDate();
    newDate.setDate(currentDay + (weeks * 7));
    return newDate;
  }

  private updateEventDates(events: any[], startDate: NgbDateStruct, currentIndex = 0): CustomTimelineEvent[] {
    const copied = [...events];
    for (let index = currentIndex; index < copied.length - currentIndex; index++) {
      if (index === currentIndex) {
        const timestamp = new Date(startDate.year, startDate.month - 1, startDate.day);
        timestamp.setUTCHours(0, 0, 0, 0);
        copied[index] = {
          ...copied[index],
          timestamp
        }
        continue;
      }

      const previousEvent = copied[index - 1];
      const newDate = new Date(previousEvent.timestamp);
      newDate.setUTCHours(0, 0, 0, 0);
      const timestamp = this.addWeeks(newDate, previousEvent.time || 0)
      copied[index] = { ...copied[index], timestamp };
    }

    return copied;
  }
}
