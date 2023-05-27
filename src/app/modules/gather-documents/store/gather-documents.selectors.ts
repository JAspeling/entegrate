import { createFeatureSelector, createSelector } from "@ngrx/store";
import { GatherDocsState } from "./gather-documents.state";

const featureSelector = createFeatureSelector<GatherDocsState>('gatherDocuments');

export const GetConfig = createSelector(
  featureSelector,
  state => state
)

export const getState = createSelector(
  featureSelector,
  state => ({
    id: state.id,
    done: state.done,
  })
)
