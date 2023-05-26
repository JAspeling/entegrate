import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PoliceClearanceState } from "./police-clearance-store.state";

const featureSelector = createFeatureSelector<PoliceClearanceState>('police-clearance')

export const getConfig = createSelector(
  featureSelector,
  (state: PoliceClearanceState) => state
)

