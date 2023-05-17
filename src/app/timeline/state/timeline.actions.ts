import { createAction, props } from "@ngrx/store";
import { CustomTimelineEvent } from "../../models/timeline-event.interface";

export const addEvents = createAction(
  '[Timeline] Add events',
  props<{ events: CustomTimelineEvent[] }>()
);

export const addEvent = createAction(
  '[Timeline] Add event',
  props<{ event: CustomTimelineEvent }>()
);

export const setCurrent = createAction(
  '[Timeline] Set current',
  props<{ event: CustomTimelineEvent }>()
);

export const clearCurrentEvent = createAction(
  '[Timeline] Clear current event'
);
