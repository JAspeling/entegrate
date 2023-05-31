import { createAction } from "@ngrx/store";

export enum actions {
  GetConfig = '[Mvv] Get Config',
  SetId = '[Mvv] Set Id'
}

export const getConfig = createAction(
  actions.GetConfig
)
