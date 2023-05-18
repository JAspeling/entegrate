import { createAction, props } from "@ngrx/store";
import { UnabridgedOptions } from "../models/unabridged-options.interface";

// CRUD on options
export const getUnabridgedOptions = createAction(
  '[Unabridged] Get unabridged options'
)

export const updateUnabridgedOptions = createAction(
  '[Unabridged] Update unabridged options',
  props<{ options: UnabridgedOptions }>()
)

export const updateUnabridgedOptionsSuccess = createAction(
  '[Unabridged] Update unabridged options success',
  props<{ options: UnabridgedOptions }>()
)

export const updateUnabridgedOptionsFailure = createAction(
  '[Unabridged] Update unabridged options failure',
  props<{ error: string }>()
)
