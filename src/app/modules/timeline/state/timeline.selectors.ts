import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TimelineState } from "./timeline.state";

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

export const getIsCompleted = createSelector(
  getEventsFeatureState,
  getCurrentEvent,
  (state, currentEvent) => currentEvent?.done
)
