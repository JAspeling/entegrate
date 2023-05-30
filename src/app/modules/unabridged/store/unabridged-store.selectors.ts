import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UnabridgedState } from "./unabridged-store.state";

const featureSelector = createFeatureSelector<UnabridgedState>('unabridged');

export const getConfig = createSelector(
  featureSelector,
  (state) => ({
    selectedOption: state.selectedOption,
    done: state.done,
    cost: state.cost,
    time: state.time
  })
)

export const getCost = createSelector(
  featureSelector,
  (state) => state.cost
)

export const getDone = createSelector(
  featureSelector,
  (state) => state.done
)

export const getTime = createSelector(
  featureSelector,
  (state) => state.time
)

export const getState = createSelector(
  featureSelector,
  (state: UnabridgedState) => ({
    id: state.id,
    done: state.done,
    time: state.time,
  })
)
