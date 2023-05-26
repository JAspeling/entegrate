import { createReducer, on } from "@ngrx/store";
import { AppState, initialState } from "./app.state";
import { AppActions } from "./index";

export const appReducer = createReducer(
  initialState,
  on(
    AppActions.getAppName, (state): AppState => ({
      ...state
    })
  ),
  on(
    AppActions.updateTotalTime, (state, action): AppState => {
      const newTime = { ...state.time };
      newTime[`${action.component}_total`] = action.totalTime;
      return {
        ...state,
        time: newTime
      };
    }
  ),
  on(
    AppActions.updateCurrentTime, (state, action): AppState => {
      const newTime = { ...state.time };
      newTime[`${action.component}_current`] = action.currentTime;
      return {
        ...state,
        time: newTime
      }
    }
  )
)
