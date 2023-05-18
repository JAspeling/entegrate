import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import * as timelineActions from "./timeline.actions";
import { CustomTimelineEvent } from "../../models/timeline-event.interface";

export interface TimelineState {
  events: CustomTimelineEvent[];
  currentEventId: string;
}

const initialState: TimelineState = {
  events: [],
  currentEventId: null
}

const getEventsFeatureState = createFeatureSelector<TimelineState>('timeline');

export const getEvents = createSelector(
  getEventsFeatureState,
  state => state.events
)

export const getCurrentEventId = createSelector(
  getEventsFeatureState,
  state => state.currentEventId
)

// Composed selector to navigate down the state tree
// This increases encapsulation and re-usability of selectors
export const getCurrentEvent = createSelector(
  getEventsFeatureState,
  getCurrentEventId,
  (state, currentEventId) => {
    return currentEventId ? state.events.find(event => event.id === currentEventId) : null;
  }
);

export const getCurrentTemplate = createSelector(
  getEventsFeatureState,
  getCurrentEvent,
  (state, currentEvent) => currentEvent?.template
)

export const timelineReducer = createReducer<TimelineState>(
  initialState,
  on(timelineActions.addEvent, (state, action) => ({
      ...state,
      events: [...state.events, action.event]
    })
  ),
  on(
    timelineActions.setCurrent, (state, action) => ({
      ...state,
      currentEventId: action.eventId
    })
  ),
  on(
    timelineActions.clearCurrentEvent, (state) => ({
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
  )
);

