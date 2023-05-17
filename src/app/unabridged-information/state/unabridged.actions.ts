import { createAction, props } from "@ngrx/store";

export const setMarkAsDone = createAction(
  '[Unabridged] Set mark as done',
  props<{ markAsDone: boolean }>()
)

export const setSelectedOption = createAction(
  '[Unabridged] Set selected option',
  props<{ selectedOption: number }>()
);
