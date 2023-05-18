import { createAction, props } from "@ngrx/store";
import { CustomTimelineEvent } from "../../models/timeline-event.interface";

export const loadEvents = createAction(
  '[Timeline] Load events'
);

export const loadEventsSuccess = createAction(
  '[Timeline] Load Events Success',
  props<{ events: CustomTimelineEvent[] }>()
);

export const loadEventsFailure = createAction(
  '[Timeline] Load Events Fail',
  props<{ error: string }>()
);

export const addEvent = createAction(
  '[Timeline] Add event',
  props<{ event: CustomTimelineEvent }>()
);

export const setCurrent = createAction(
  '[Timeline] Set current',
  props<{ eventId: string }>()
);

export const setCurrentSuccess = createAction(
  '[Timeline] Set current success',
  props<{ eventId: string }>()
)

export const setCurrentFailure = createAction(
  '[Timeline] Set current failure',
  props<{ error: string }>()
)

export const getCurrent = createAction(
  '[Timeline] Get current'
);

export const getCurrentSuccess = createAction(
  '[Timeline] Get current success',
  props<{ eventId: string }>()
)

export const clearCurrentEvent = createAction(
  '[Timeline] Clear current event'
);

