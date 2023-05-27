import { CustomTimelineEvent } from "../../../shared/models/timeline-event.interface";

export interface TimelineState {
  events: CustomTimelineEvent[];
  currentEventId: string;
}

export const initialState: TimelineState = {
  events: [],
  currentEventId: null
}
