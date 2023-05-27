import { createAction, props } from "@ngrx/store";
import { ApostilleState } from "./apostille.state";

export enum actions {
  Update = '[Apostille] Update',
  UpdateSuccess = '[Apostille] Update success',
  GetSaved = '[Apostille] Get saved',
  ActionSuccess = '[Apostille] Action success',
  SetId = '[Apostille] Set Id'
}

export const getSaved = createAction(
  actions.GetSaved
)

export const getSavedSuccess = createAction(
  actions.ActionSuccess,
  props<ApostilleState>()
)

export const update = createAction(
  actions.Update,
  props<ApostilleState>()
)

export const updateSuccess = createAction(
  actions.UpdateSuccess,
  props<ApostilleState>()
)

export const setId = createAction(
  actions.SetId,
  props<{ id: string }>()
)
