import { PetsState } from "./pets.state";
import { createFeatureSelector, createSelector } from "@ngrx/store";

const featureSelector = createFeatureSelector<PetsState>('pets');

export const getConfig = createSelector(
  featureSelector,
  (state) => state
)

export const getState = createSelector(
  featureSelector,
  (state) => ({
    id: state.id,
    done: state.done,
    time: state.time,
  })
)
