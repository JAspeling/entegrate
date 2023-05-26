import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProcessInformationState } from "./process-info-store.state";

const getProcessInformationFeatureState = createFeatureSelector<ProcessInformationState>('processInformation');

export const getIsOpen = createSelector(
  getProcessInformationFeatureState,
  (state) => state.isOpen,
)

export const getProcessInformation = createSelector(
  getProcessInformationFeatureState,
  (state) => state
)

export const isMarried = createSelector(
  getProcessInformationFeatureState,
  (state) => state.married,
)

export const isMoreThanOne = createSelector(
  getProcessInformationFeatureState,
  (state) => ((state.children && state.childrenCount > 1) || state.partner === true),
)

export const includingChildren = createSelector(
  getProcessInformationFeatureState,
  (state) => state.children,
)

export const applicationAmount = createSelector(
  getProcessInformationFeatureState,
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
