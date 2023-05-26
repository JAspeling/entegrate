import { createReducer } from "@ngrx/store";
import { ApostilleState, initialState } from "./apostille.state";

export const apostilleReducer = createReducer<ApostilleState>(
  initialState
);
