import { createAction } from "@ngrx/store";

export enum ProcessInformationActionTypes {
  Toggle = '[Process Information] Toggle Process Information',
}

export const toggleProcessInformation = createAction(
  ProcessInformationActionTypes.Toggle
)
