import { createReducer, createSelector, on } from "@ngrx/store";
import { AppState } from "./app.state";
import * as AppActions from './app.actions';

const initialState: AppState = {
  name: 'Entegrate'
}

export const appReducer = createReducer(
  initialState,
  on(
    AppActions.getAppName, (state): AppState => ({
      ...state
    })
  )
)
