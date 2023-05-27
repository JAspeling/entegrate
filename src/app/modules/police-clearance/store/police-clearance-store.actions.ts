import { createAction, props } from "@ngrx/store";
import { PoliceClearanceState } from "./police-clearance-store.state";

export enum actions {
  GetSaved = '[Police Clearance] Get Saved',
  GetSavedSuccess = '[Police Clearance] Get Saved Success',
  Update = '[Police Clearance] Update',
  UpdateSuccess = '[Police Clearance] Update Success',
  SetId = '[Police Clearance] Set Id',
}

export const getSaved = createAction(
  actions.GetSaved
)

export const getSavedSuccess = createAction(
  actions.GetSavedSuccess,
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

export const setId = createAction(
  actions.SetId,
  props<{ id: string }>()
)
