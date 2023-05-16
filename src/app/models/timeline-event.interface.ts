import { NgxTimelineEvent } from "@frxjs/ngx-timeline";
import { Type } from "@angular/core";

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
  active?: boolean;
  template?: Type<any>;
}

export interface Metric {
  minimum?: number;
  maximum?: number;
  average?: number;
}
