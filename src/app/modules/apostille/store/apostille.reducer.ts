import { createReducer, on } from "@ngrx/store";
import { ApostilleState, initialState } from "./apostille.state";
import { ApostilleActions } from "./index";

export const apostilleReducer = createReducer<ApostilleState>(
  initialState,
  on(ApostilleActions.getSaved, (state) => ({
      ...state,
    })
  ),
  on(ApostilleActions.getSavedSuccess, (state, action) => ({
      ...state,
      ...action
    })
  ),
  on(ApostilleActions.updateSuccess, (state, action) => ({
      ...state,
      ...action
    })
  )
);
