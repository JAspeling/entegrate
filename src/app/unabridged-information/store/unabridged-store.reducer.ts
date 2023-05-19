import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import * as UnabridgedActions from './unabridged-store.actions';
import { initialState, UnabridgedState } from "./unabridged-store.state";


export const unabridgedStoreReducer = createReducer<UnabridgedState>(
  initialState,
  on(
    UnabridgedActions.updateUOptionsSuccess, (state, action) => ({
      ...state,
      options: action.options,
      error: null
    })
  ),
  on(
    UnabridgedActions.actionFailure, (state, action) => ({
      ...state,
      error: action.error
    })
  ),
  on(
    UnabridgedActions.getOptionsSuccess, (state, action) => ({
      ...state,
      options: action.options,
      error: null
    })
  )
)
