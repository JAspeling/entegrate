import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UnabridgedState } from "./unabridged-store.state";

const getUnabridgedFeatureState = createFeatureSelector<UnabridgedState>('unabridged');

export const getOptions = createSelector(
  getUnabridgedFeatureState,
  state => state.options
)
