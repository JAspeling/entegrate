import { Type } from "@angular/core";
import { UnabridgedInformationComponent } from "../unabridged-information/unabridged-information.component";
import { TimelineState } from "../timeline/state/timeline.reducer";
import { UnabridgedState } from "../unabridged-information/store/unabridged-store.state";

export interface AppState {
  name: string
}

export interface State {
  app: AppState;
  timeline: TimelineState;
  unabridged: UnabridgedState;
}

// Dictionary map of the components
export const componentMap = new Map<string, Type<any>>([
  ['UnabridgedInformationComponent', UnabridgedInformationComponent]
]);
