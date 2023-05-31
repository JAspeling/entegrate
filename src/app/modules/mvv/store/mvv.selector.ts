import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MvvState } from "./mvv.state";

const featureSelector = createFeatureSelector<MvvState>('mvv');

export const getConfig = createSelector(
  featureSelector,
  (state) => state
)
