import { NgxTimelineEvent } from "@frxjs/ngx-timeline";

export interface CustomTimelineEvent extends NgxTimelineEvent {
  /**
   * The duration of the event in weeks
   */
  duration?: Metric;

  /**
   * The cost of the event in Rands
   */
  cost?: Metric;

  alternatives?: CustomTimelineEvent[],

  template?: string;
}

export interface Metric {
  minimum?: number;
  maximum?: number;
  average?: number;
}