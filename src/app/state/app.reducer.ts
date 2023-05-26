import { createReducer, on } from "@ngrx/store";
import { AppState } from "./app.state";
import { AppActions } from "./index";

const initialState: AppState = {
  name: 'Entegrate',
  totalTime: 0,
  currentTime: 0
}

export const appReducer = createReducer(
  initialState,
  on(
    AppActions.getAppName, (state): AppState => ({
      ...state
    })
  ),
  on(
    AppActions.updateTotalTime, (state, action): AppState => ({
      ...state,
      totalTime: action.totalTime
    })
  ),
  on(
    AppActions.updateCurrentTime, (state, action): AppState => ({
      ...state,
      currentTime: action.currentTime
    })
  )
)
