import { createAction, props } from "@ngrx/store";

export enum actions {
  GetAppName = '[App] Get app name',
  UpdateTotalTime = '[App] Update total time',
  UpdateCurrentTime = '[App] Update current time',
}

export const getAppName = createAction(
  actions.GetAppName
)

export const updateTotalTime = createAction(
  actions.UpdateTotalTime,
  props<{ component: string, totalTime: number }>()
)

export const updateCurrentTime = createAction(
  actions.UpdateCurrentTime,
  props<{ component: string, currentTime: number }>()
)

//TODO: These will have to be emitted per feature to keep track of the time per feature.
