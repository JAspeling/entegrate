import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MvvState } from "./mvv.state";

const featureSelector = createFeatureSelector<MvvState>('mvv');

export const getConfig = createSelector(
  featureSelector,
  (state) => state
)

export const getState = createSelector(
  featureSelector,
  (state: MvvState) => ({
    id: state.id,
    done: state.done,
    time: state.time,
  })
)
