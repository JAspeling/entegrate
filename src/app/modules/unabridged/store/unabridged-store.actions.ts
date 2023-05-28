import { createAction, props } from "@ngrx/store";
import { UnabridgedState } from "./unabridged-store.state";

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
  props<UnabridgedState>()
)

export const actionFailure = createAction(
  actions.ActionFailure,
  props<{ error: string }>()
)

export const updateConfig = createAction(
  actions.UpdateOptions,
  props<UnabridgedState>()
)

export const updateConfigSuccess = createAction(
  actions.UpdateOptionsSuccess,
  props<UnabridgedState>()
)

export const updateLocalCostTime = createAction(
  actions.UpdateLocalCostTime,
  props<UnabridgedState>(),
);

export const setId = createAction(
  actions.SetId,
  props<{ id: string }>()
)
