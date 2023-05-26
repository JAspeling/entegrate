// create feature selector
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "./app.state";

const selectAppFeatureState = createFeatureSelector<AppState>('app');

export const getTotalTime = createSelector(
  selectAppFeatureState,
  (state) => state.totalTime
)

export const getCurrentTime = createSelector(
  selectAppFeatureState,
  (state) => state.currentTime
)
