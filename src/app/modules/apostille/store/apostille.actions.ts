import { createAction, props } from "@ngrx/store";
import { ApostilleState } from "./apostille.state";

export enum actions {
  Update = '[Apostille] Update',
  GetSaved = '[Apostille] Get saved',
  ActionSuccess = '[Apostille] Action success',
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
