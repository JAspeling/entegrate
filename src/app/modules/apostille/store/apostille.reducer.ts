import { createReducer, on } from "@ngrx/store";
import { ApostilleState, initialState } from "./apostille.state";
import { ApostilleActions } from "./index";

export const apostilleReducer = createReducer<ApostilleState>(
  initialState,
  on(ApostilleActions.getConfig, (state) => ({
      ...state,
    })
  ),
  on(ApostilleActions.getConfigSuccess, (state, action) => ({
      ...state,
      ...action
    })
  ),
  on(ApostilleActions.updateSuccess, (state, action) => ({
      ...state,
      ...action
    })
  ),
  on(ApostilleActions.setId, (state, action) => ({
      ...state,
      id: action.id
    })
  )
);
