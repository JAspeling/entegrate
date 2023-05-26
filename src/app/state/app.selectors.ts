// create feature selector
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "./app.state";

const selectAppFeatureState = createFeatureSelector<AppState>('app');

export const getTotalTime = createSelector(
  selectAppFeatureState,
  (state) => Object.keys(state.time)
    .reduce((acc, key) => acc + (key.includes('_total') ? state.time[key] : 0), 0)
)

export const getCurrentTime = createSelector(
  selectAppFeatureState,
  (state) => Object.keys(state.time)
    .reduce((acc, key) => acc + (key.includes('_current') ? state.time[key] : 0), 0)
)
