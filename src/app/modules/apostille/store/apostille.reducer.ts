import { createReducer, on } from "@ngrx/store";
import { ApostilleState, initialState } from "./apostille.state";
import { ApostilleActions } from "./index";

export const apostilleReducer = createReducer<ApostilleState>(
  initialState,
  on(ApostilleActions.getSaved, (state) => ({
      ...state,
    })
  ),
  on(ApostilleActions.getSavedSuccess, (state) => ({
      ...state,
    })
  )
);
