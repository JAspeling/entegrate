import { createReducer, on } from "@ngrx/store";
import { initialState } from "./gather-documents.state";
import { GatherDocsActions } from "./index";

export const GatherDocumentsReducer = createReducer(
  initialState,
  on(GatherDocsActions.getConfig, (state) => ({
    ...state,
  })),
  on(GatherDocsActions.getConfigSuccess, (state, action) => ({
      ...state,
      ...action
    })
  ),
  on(
    GatherDocsActions.updateConfigSuccess, (state, action) => ({
      ...state,
      ...action
    })
  ),
  on(GatherDocsActions.setId, (state, action) => ({
      ...state,
      id: action.id
    })
  )
)
