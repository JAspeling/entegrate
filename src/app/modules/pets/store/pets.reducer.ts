import { initialState, PetsState } from "./pets.state";
import { createReducer, on } from "@ngrx/store";
import { PetsActions } from "./index";

export const petsReducer = createReducer<PetsState>(initialState,
  on(PetsActions.getConfigSuccess, (state, action) => ({
      ...state,
      ...action
    })
  ),
  on(PetsActions.updateSuccess, (state, action) => ({
      ...state,
      ...action
    })
  )
)

