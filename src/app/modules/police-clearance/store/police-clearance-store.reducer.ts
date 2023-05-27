import { createReducer, on } from "@ngrx/store";
import { initialState } from "./police-clearance-store.state";
import { PoliceClearanceActions } from "./index";

export const policeClearanceReducer = createReducer(
  initialState,
  on(PoliceClearanceActions.getSaved, (state) => ({
    ...state,
  })),
  on(PoliceClearanceActions.getSavedSuccess, (state, action) => ({
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
  on(PoliceClearanceActions.setId, (state, action) => ({
      ...state,
      id: action.id
    })
  )
)
