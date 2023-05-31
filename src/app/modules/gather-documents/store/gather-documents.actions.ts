import { createAction, props } from "@ngrx/store";
import { GatherDocsState } from "./gather-documents.state";

export enum actions {
  GetConfig = '[GatherDocs] Get Config',
  GetConfigSuccess = '[GatherDocs] Get Config Success',
  UpdateConfig = '[GatherDocs] Update Config',
  UpdateConfigSuccess = '[GatherDocs] Update Config Success',
  SetId = '[GatherDocs] Set Id'
}

export const getConfig = createAction(
  actions.GetConfig
)

export const getConfigSuccess = createAction(
  actions.GetConfigSuccess,
  props<GatherDocsState>()
)

export const updateConfig = createAction(
  actions.UpdateConfig,
  props<GatherDocsState>()
)

export const updateConfigSuccess = createAction(
  actions.UpdateConfigSuccess,
  props<GatherDocsState>()
)

