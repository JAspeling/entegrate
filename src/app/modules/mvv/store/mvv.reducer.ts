import { initialState, MvvState } from "./mvv.state";
import { createReducer, on } from "@ngrx/store";
import { ApostilleActions } from "../../apostille/store";

export const mvvReducer = createReducer<MvvState>(initialState,
  on(ApostilleActions.getConfig, (state) => ({
      ...state,
    })
  )
)

