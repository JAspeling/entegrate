import { Type } from "@angular/core";
import { UnabridgedInformationComponent } from "../modules/unabridged/unabridged-information.component";
import { TimelineState } from "../modules/timeline/state/timeline.reducer";
import { UnabridgedState } from "../modules/unabridged/store/unabridged-store.state";
import { ProcessInformationState } from "../modules/process-information/store/process-info-store.state";

export interface AppState {
  name: string
}

export interface State {
  app: AppState;
  processInformation: ProcessInformationState;
  timeline: TimelineState;
  unabridged: UnabridgedState;
}

// Dictionary map of the components
export const componentMap = new Map<string, Type<any>>([
  ['UnabridgedInformationComponent', UnabridgedInformationComponent]
]);
