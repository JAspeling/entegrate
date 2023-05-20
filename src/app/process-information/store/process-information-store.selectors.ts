import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProcessInformationState } from "./process-info-store.state";

const getProcessInformationFeatureState = createFeatureSelector<ProcessInformationState>('processInformation');

export const getIsOpen = createSelector(
  getProcessInformationFeatureState,
  (state) => state.isOpen,
)
