import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import * as UnabridgedActions from './unabridged.actions';

export interface UnabridgedState {
  markAsDone: boolean;
  selectedOption?: number
}

export const initialState: UnabridgedState = {
  markAsDone: false,
  selectedOption: undefined
}

const getUnabridgedFeatureState = createFeatureSelector<UnabridgedState>('unabridged');

export const getMarkAsDone = createSelector(
  getUnabridgedFeatureState,
  state => state.markAsDone
);

export const getSelectedOption = createSelector(
  getUnabridgedFeatureState,
  state => state.selectedOption
);

export const unabridgedReducer = createReducer<UnabridgedState>(
  initialState,
  on(
    UnabridgedActions.setMarkAsDone, (state, action) => ({
      ...state,
      markAsDone: action.markAsDone
    })
  ),
  on(
    UnabridgedActions.setSelectedOption, (state, action) => ({
      ...state,
      selectedOption: action.selectedOption
    })
  )
)
