import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ApostilleState } from "./apostille.state";

const getFeatureSelector = createFeatureSelector<ApostilleState>("apostille");

export const getConfig = createSelector(
  getFeatureSelector,
  (state) => state
)

export const getIsDone = createSelector(
  getFeatureSelector,
  (state) => state.done
)

export const getTime = createSelector(
  getFeatureSelector,
  (state) => state.time
)

export const getCost = createSelector(
  getFeatureSelector,
  (state) => state.cost
)
