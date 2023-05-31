import { createReducer, on } from "@ngrx/store";
import { initialState } from "./police-clearance-store.state";
import { PoliceClearanceActions } from "./index";

export const policeClearanceReducer = createReducer(
  initialState,
  on(PoliceClearanceActions.getConfig, (state) => ({
    ...state,
  })),
  on(PoliceClearanceActions.getConfigSuccess, (state, action) => ({
      ...state,
      ...action
    })
  ),
  on(
    PoliceClearanceActions.updateSuccess, (state, action) => ({
      ...state,
      ...action
    })
  ),

)
