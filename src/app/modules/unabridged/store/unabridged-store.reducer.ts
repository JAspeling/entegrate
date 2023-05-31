import { createReducer, on } from "@ngrx/store";
import * as UnabridgedActions from './unabridged-store.actions';
import { initialState, UnabridgedState } from "./unabridged-store.state";


export const unabridgedStoreReducer = createReducer<UnabridgedState>(
  initialState,
  on(UnabridgedActions.actionFailure, (state, action) => ({
      ...state,
      error: action.error
    })
  ),
  on(UnabridgedActions.getConfigSuccess, (state, action) => ({
      ...state,
      ...action
    })
  ),
  on(UnabridgedActions.updateLocalCostTime, (state, action) => ({
      ...state,
      ...action
    })
  ),
  on(UnabridgedActions.updateConfigSuccess, (state, action) => ({
      ...state,
      selectedOption: action.selectedOption,
      done: action.done,
      error: null
    })
  ),
)
