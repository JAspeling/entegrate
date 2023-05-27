import { createAction, props } from "@ngrx/store";
import { UnabridgedConfig } from "../models/unabridged-options.interface";

export enum actions {
  ActionSuccess = '[Unabridged] Action success',
  ActionFailure = '[Unabridged] Action failure',
  GetOptions = '[Unabridged] Get unabridged options',
  UpdateOptions = '[Unabridged] Update unabridged options',
  UpdateOptionsSuccess = '[Unabridged] Update unabridged options success',
  UpdateLocalCostTime = '[Unabridged] Update local cost time',
  SetId = '[Unabridged] Set Id'
}

// CRUD on options
export const getConfig = createAction(
  actions.GetOptions
)

export const getConfigSuccess = createAction(
  actions.ActionSuccess,
  props<UnabridgedConfig>()
)

export const actionFailure = createAction(
  actions.ActionFailure,
  props<{ error: string }>()
)

export const updateConfig = createAction(
  actions.UpdateOptions,
  props<UnabridgedConfig>()
)

export const updateConfigSuccess = createAction(
  actions.UpdateOptionsSuccess,
  props<UnabridgedConfig>()
)

export const updateLocalCostTime = createAction(
  actions.UpdateLocalCostTime,
  props<UnabridgedConfig>(),
);

export const setId = createAction(
  actions.SetId,
  props<{ id: string }>()
)
