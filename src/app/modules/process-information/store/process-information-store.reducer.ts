import { createReducer, on } from "@ngrx/store";
import { initialState } from "./process-info-store.state";
import {
  getProcessInformationSuccess,
  toggleProcessInformation,
  updateProcessInformation
} from "./process-information-store.actions";


export const processInformationReducer = createReducer(
  initialState,
  on(
    toggleProcessInformation, (state): any => ({
      ...state,
      isOpen: !state.isOpen
    })
  ),
  on(
    updateProcessInformation, (state, action): any => ({
      ...state,
      ...action
    })
  ),
  on(
    getProcessInformationSuccess, (state, action): any => ({
      ...state,
      ...action
    })
  )
)
