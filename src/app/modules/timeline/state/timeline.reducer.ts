import { createReducer, on } from "@ngrx/store";
import * as timelineActions from "./timeline.actions";
import { initialState, TimelineState } from "./timeline.state";
import { TimelineActions } from "./index";

export const timelineReducer = createReducer<TimelineState>(
  initialState,
  on(
    timelineActions.setCurrentSuccess, (state, action) => ({
      ...state,
      currentEventId: action.eventId
    })
  ),
  on(
    timelineActions.clearCurrentEventSuccess, (state) => ({
      ...state,
      currentEventId: null
    })
  ),
  on(
    timelineActions.loadEventsSuccess, (state, action) => ({
      ...state,
      events: [...action.events]
    })
  ),
  on(
    timelineActions.getCurrentSuccess, (state, action) => ({
      ...state,
      currentEventId: action.eventId
    })
  ),
  on(
    TimelineActions.updateEvent, (state, action) => ({
      ...state,
      events: state.events?.map(event => event.id === action.id
        ? {
          ...event,
          done: action.done,
          time: action.time ? action.time : event.time,
          timestamp: action.timestamp || event.timestamp
        }
        : event)
    })
  ),
  on(
    TimelineActions.updateEventsSuccess, (state, action) => ({
      ...state,
      events: action.events
    })
  )
);

