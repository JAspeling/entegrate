import { createAction, props } from "@ngrx/store";
import { UnabridgedOptions } from "../models/unabridged-options.interface";

export enum UnabridgedStoreActions {
  ActionSuccess = '[Unabridged] Action success',
  ActionFailure = '[Unabridged] Action failure',
  GetOptions = '[Unabridged] Get unabridged options',
  UpdateOptions = '[Unabridged] Update unabridged options',
  UpdateOptionsSuccess = '[Unabridged] Update unabridged options success',
}

// CRUD on options
export const getOptions = createAction(
  UnabridgedStoreActions.GetOptions
)

export const getOptionsSuccess = createAction(
  UnabridgedStoreActions.ActionSuccess,
  props<{ options: UnabridgedOptions }>()
)

export const actionFailure = createAction(
  UnabridgedStoreActions.ActionFailure,
  props<{ error: string }>()
)

export const updateOptions = createAction(
  UnabridgedStoreActions.UpdateOptions,
  props<{ options: UnabridgedOptions }>()
)

export const updateUOptionsSuccess = createAction(
  UnabridgedStoreActions.UpdateOptionsSuccess,
  props<{ options: UnabridgedOptions }>()
)
