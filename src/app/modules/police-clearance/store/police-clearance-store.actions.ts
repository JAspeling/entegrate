import { createAction, props } from "@ngrx/store";
import { PoliceClearanceState } from "./police-clearance-store.state";

export enum actions {
  GetConfig = '[Police Clearance] Get Config',
  GetConfigSuccess = '[Police Clearance] Get Config Success',
  Update = '[Police Clearance] Update',
  UpdateSuccess = '[Police Clearance] Update Success',
  SetId = '[Police Clearance] Set Id',
}

export const getConfig = createAction(
  actions.GetConfig
)

export const getConfigSuccess = createAction(
  actions.GetConfigSuccess,
  props<PoliceClearanceState>()
)

export const update = createAction(
  actions.Update,
  props<PoliceClearanceState>()
)

export const updateSuccess = createAction(
  actions.UpdateSuccess,
  props<PoliceClearanceState>()
)
