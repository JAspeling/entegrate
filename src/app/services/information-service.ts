import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { NgxTimelineItem } from "@frxjs/ngx-timeline";
import { CustomTimelineEvent } from "../models/timeline-event.interface";

@Injectable({
  providedIn: 'root'
})
export class InformationService {
  state$: BehaviorSubject<CustomTimelineEvent | undefined>
    = new BehaviorSubject<CustomTimelineEvent | undefined>(undefined);
  template$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  toggle(value?: CustomTimelineEvent) {
    this.state$.next(value);
  }

  setTemplate(template: any) {
    this.template$.next(template);
  }
}
