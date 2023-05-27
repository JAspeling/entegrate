import { createAction, props } from "@ngrx/store";
import { CustomTimelineEvent } from "../../../shared/models/timeline-event.interface";

export enum actions {
  LoadEvents = '[Timeline] Load events',
  LoadEventsSuccess = '[Timeline] Load events success',
  LoadEventsFailure = '[Timeline] Load events failure',
  AddEvent = '[Timeline] Add event',
  SetCurrent = '[Timeline] Set current',
  SetCurrentSuccess = '[Timeline] Set current success',
  SetCurrentFailure = '[Timeline] Set current failure',
  GetCurrent = '[Timeline] Get current',
  GetCurrentSuccess = '[Timeline] Get current success',
  ClearCurrentEvent = '[Timeline] Clear current event',
  ClearCurrentEventSuccess = '[Timeline] Clear current event success',
  UpdateEvent = '[Timeline] Update event',
}

export const loadEvents = createAction(
  actions.LoadEvents
);

export const loadEventsSuccess = createAction(
  actions.LoadEventsSuccess,
  props<{ events: CustomTimelineEvent[] }>()
);

export const loadEventsFailure = createAction(
  actions.LoadEventsFailure,
  props<{ error: string }>()
);

export const addEvent = createAction(
  actions.AddEvent,
  props<{ event: CustomTimelineEvent }>()
);

export const setCurrent = createAction(
  actions.SetCurrent,
  props<{ eventId: string }>()
);

export const setCurrentSuccess = createAction(
  actions.SetCurrentSuccess,
  props<{ eventId: string }>()
)

export const setCurrentFailure = createAction(
  actions.SetCurrentFailure,
  props<{ error: string }>()
)

export const getCurrent = createAction(
  actions.GetCurrent
);

export const getCurrentSuccess = createAction(
  actions.GetCurrentSuccess,
  props<{ eventId: string }>()
)

export const clearCurrentEvent = createAction(
  actions.ClearCurrentEvent
);

export const clearCurrentEventSuccess = createAction(
  actions.ClearCurrentEventSuccess
);

export const updateEvent = createAction(
  actions.UpdateEvent,
  props<{ id: string, done: boolean }>()
)
