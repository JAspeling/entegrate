import { createAction, props } from "@ngrx/store";
import { MvvState } from "./mvv.state";

export enum actions {
  GetConfig = '[Mvv] Get Config',
  GetConfigSuccess = '[Mvv] Get Config Success',
  Update = '[Mvv] Update Config',
  UpdateSuccess = '[Mvv] Update Config Success',
  SetId = '[Mvv] Set Id'
}

export const getConfig = createAction(
  actions.GetConfig
)

export const getConfigSuccess = createAction(
  actions.GetConfigSuccess,
  props<MvvState>()
)

export const update = createAction(
  actions.Update,
  props<MvvState>()
)

export const updateSuccess = createAction(
  actions.UpdateSuccess,
  props<MvvState>()
)
