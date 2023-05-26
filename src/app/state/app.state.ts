import { TimelineState } from "../modules/timeline/state/timeline.reducer";
import { UnabridgedState } from "../modules/unabridged/store/unabridged-store.state";
import { ProcessInformationState } from "../modules/process-information/store/process-info-store.state";

export interface AppState {
  name: string

  /**
   * Time is measured in weeks.
   */
  totalTime: number;
  currentTime: number;
}

export interface State {
  app: AppState;
  processInformation: ProcessInformationState;
  timeline: TimelineState;
  unabridged: UnabridgedState;
}

