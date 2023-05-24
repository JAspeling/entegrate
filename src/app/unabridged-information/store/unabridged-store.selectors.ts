import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UnabridgedState } from "./unabridged-store.state";

const getUnabridgedFeatureState = createFeatureSelector<UnabridgedState>('unabridged');

export const getConfig = createSelector(
  getUnabridgedFeatureState,
  (state) => ({
    selectedOption: state.selectedOption,
    done: state.done,
    cost: state.cost,
    time: state.time
  })
)

export const getCost = createSelector(
  getUnabridgedFeatureState,
  (state) => state.cost
)
