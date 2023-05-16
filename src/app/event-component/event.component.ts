import { Component, Input, OnInit } from "@angular/core";
import { NgxTimelineEvent, NgxTimelineItem } from "@frxjs/ngx-timeline";
import { InformationService } from "../services/information-service";
import { UnabridgedInformationComponent } from "../unabridged-information/unabridged-information.component";
import { CustomTimelineEvent } from "../models/timeline-event.interface";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
})
export class EventComponent implements OnInit {
  @Input() event: NgxTimelineItem;

  constructor(private informationService: InformationService) {

  }

  get eventInfo(): CustomTimelineEvent | undefined {
    return this.event?.eventInfo as CustomTimelineEvent;
  }

  ngOnInit() {
    console.log(this.event);

    this.informationService.state$.subscribe((value) => {
      if (this.eventInfo && value?.id !== this.eventInfo?.id) {
        this.eventInfo.active = false;
      }
    })
  }

  toggle() {
    if (this.eventInfo) {
      this.eventInfo.active = !this.eventInfo.active;
      this.informationService.toggle(this.eventInfo);

      this.informationService.setTemplate(this.eventInfo.template);
    }
  }
}
