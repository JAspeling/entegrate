import { initialState, MvvState } from "./mvv.state";
import { createReducer, on } from "@ngrx/store";
import { MvvActions } from "./index";

export const mvvReducer = createReducer<MvvState>(initialState,
  on(MvvActions.getConfigSuccess, (state, action) => ({
      ...state,
      ...action
    })
  ),
  on(MvvActions.updateSuccess, (state, action) => ({
      ...state,
      ...action
    })
  )
)

