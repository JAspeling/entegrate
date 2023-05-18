import { Component, Input, OnInit } from "@angular/core";
import { NgxTimelineItem } from "@frxjs/ngx-timeline";
import { InformationService } from "../services/information-service";
import { CustomTimelineEvent } from "../models/timeline-event.interface";
import { Store } from "@ngrx/store";
import { getCurrentEvent, TimelineState } from "../timeline/state/timeline.reducer";
import * as timelineActions from "../timeline/state/timeline.actions";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
})
export class EventComponent implements OnInit {
  @Input() event: NgxTimelineItem;
  active: boolean = false;

  constructor(private store: Store<TimelineState>, private informationService: InformationService) {

  }

  get eventInfo(): CustomTimelineEvent {
    return this.event?.eventInfo as CustomTimelineEvent;
  }

  ngOnInit() {
    this.store.select(getCurrentEvent).subscribe((value) => {
      this.active = value?.id === this.eventInfo.id;
    });
  }

  toggle() {
    if (this.active) {
      this.store.dispatch(timelineActions.clearCurrentEvent());
    } else {
      this.store.dispatch(timelineActions.setCurrent({ eventId: this.eventInfo.id }));
    }
  }
}
