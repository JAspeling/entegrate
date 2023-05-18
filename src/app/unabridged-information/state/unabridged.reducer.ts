import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import * as UnabridgedActions from './unabridged.actions';
import { UnabridgedOptions } from "../models/unabridged-options.interface";

export interface UnabridgedState {
  options: UnabridgedOptions;
  error: string;
}

const initialState: UnabridgedState = {
  options: {
    selectedOption: 0,
    done: false
  },
  error: null
}

const getUnabridgedFeatureState = createFeatureSelector<UnabridgedState>('unabridged');

export const getUnabridgedOptions = createSelector(
  getUnabridgedFeatureState,
  state => state.options
)

export const unabridgedReducer = createReducer<UnabridgedState>(
  initialState,
  on(
    UnabridgedActions.updateUnabridgedOptionsSuccess, (state, action) => ({
      ...state,
      options: action.options,
      error: null
    })
  ),
  on(
    UnabridgedActions.updateUnabridgedOptionsFailure, (state, action) => ({
      ...state,
      error: action.error
    })
  )
)
