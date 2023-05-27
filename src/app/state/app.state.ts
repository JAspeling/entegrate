import { UnabridgedState } from "../modules/unabridged/store/unabridged-store.state";
import { ProcessInformationState } from "../modules/process-information/store/process-info-store.state";
import { ApostilleState } from "../modules/apostille/store/apostille.state";
import { PoliceClearanceState } from "../modules/police-clearance/store/police-clearance-store.state";
import { TimelineState } from "../modules/timeline/state/timeline.state";

export interface AppState {
  name: string

  /**
   * Time is measured in weeks.
   */
  totalTime: number;
  currentTime: number;

  time: { [key: string]: number };
}

export const initialState: AppState = {
  name: 'Entegrate',
  time: {},
  totalTime: 0,
  currentTime: 0
}

export interface State {
  app: AppState;
  processInformation: ProcessInformationState;
  timeline: TimelineState;
  unabridged: UnabridgedState;
  apostille: ApostilleState;
  policeClearance: PoliceClearanceState
}

