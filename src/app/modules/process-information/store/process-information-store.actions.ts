import { createAction, props } from "@ngrx/store";
import { IProcessInformation } from "../models/process-information";
import { ProcessInformationState } from "./process-info-store.state";

export enum ProcessInformationActionTypes {
  Toggle = '[Process Information] Toggle Process Information',
  Update = '[Process Information] Update Process Information',
  Get = '[Process Information] Get Process Information',
  GetSuccess = '[Process Information] Get Process Information Success',
}

export const toggleProcessInformation = createAction(
  ProcessInformationActionTypes.Toggle
)

export const updateProcessInformation = createAction(
  ProcessInformationActionTypes.Update,
  props<{ options: IProcessInformation }>()
)

export const getProcessInformation = createAction(
  ProcessInformationActionTypes.Get
)

export const getProcessInformationSuccess = createAction(
  ProcessInformationActionTypes.GetSuccess,
  props<{ options: ProcessInformationState }>()
)
