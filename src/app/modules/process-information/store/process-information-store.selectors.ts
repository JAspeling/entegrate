import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProcessInformationState } from "./process-info-store.state";

const featureSelector = createFeatureSelector<ProcessInformationState>('processInformation');

export const getIsOpen = createSelector(
  featureSelector,
  (state) => state.isOpen,
)

export const getProcessInformation = createSelector(
  featureSelector,
  (state) => state
)

export const isMarried = createSelector(
  featureSelector,
  (state) => state.married,
)

export const isMoreThanOne = createSelector(
  featureSelector,
  (state) => ((state.children && state.childrenCount > 1) || state.partner === true),
)

export const includingChildren = createSelector(
  featureSelector,
  (state) => state.children,
)

export const applicationAmount = createSelector(
  featureSelector,
  (state) => {
    let count = 1;
    if (state.partner) {
      count++;
    }
    if (state.children) {
      count += state.childrenCount;
    }
    return count;
  },
)
