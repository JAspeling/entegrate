import { createAction, props } from "@ngrx/store";
import { PetsState } from "./pets.state";

export enum actions {
  GetConfig = '[Pets] Get Config',
  GetConfigSuccess = '[Pets] Get Config Success',
  Update = '[Pets] Update Config',
  UpdateSuccess = '[Pets] Update Config Success',
  SetId = '[Pets] Set Id'
}

export const getConfig = createAction(
  actions.GetConfig
)

export const getConfigSuccess = createAction(
  actions.GetConfigSuccess,
  props<PetsState>()
)

export const update = createAction(
  actions.Update,
  props<PetsState>()
)

export const updateSuccess = createAction(
  actions.UpdateSuccess,
  props<PetsState>()
)
