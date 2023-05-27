import { createAction, props } from "@ngrx/store";
import { ProcessInformationState } from "./process-info-store.state";

export enum ProcessInformationActionTypes {
  Toggle = '[Process Information] Toggle Process Information',
  Update = '[Process Information] Update Process Information',
  UpdateWithoutNotifying = '[Process Information] Update Process Information Without Notifying',
  UpdateSuccess = '[Process Information] Update Process Information Success',
  Get = '[Process Information] Get Process Information',
  GetSuccess = '[Process Information] Get Process Information Success',
}

export const toggleProcessInformation = createAction(
  ProcessInformationActionTypes.Toggle
)

export const updateProcessInformation = createAction(
  ProcessInformationActionTypes.Update,
  props<ProcessInformationState>()
)

export const updateProcessInformationSuccess = createAction(
  ProcessInformationActionTypes.UpdateSuccess,
  props<ProcessInformationState>()
)

export const updateProcessInformationWithoutNotifying = createAction(
  ProcessInformationActionTypes.UpdateWithoutNotifying,
  props<ProcessInformationState>()
)

export const getProcessInformation = createAction(
  ProcessInformationActionTypes.Get
)

export const getProcessInformationSuccess = createAction(
  ProcessInformationActionTypes.GetSuccess,
  props<ProcessInformationState>()
)
