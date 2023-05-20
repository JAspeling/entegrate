import { createReducer, on } from "@ngrx/store";
import { initialState } from "./process-info-store.state";
import { toggleProcessInformation } from "./process-information-store.actions";


export const processInformationReducer = createReducer(
  initialState,
  on(
    toggleProcessInformation, (state): any => ({
      ...state,
      isOpen: !state.isOpen
    })
  )
)
