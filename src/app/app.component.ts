import { Component, Type, ViewChild } from '@angular/core';
import { NgxTimelineEventChangeSideInGroup } from "@frxjs/ngx-timeline";
import { CustomTimelineEvent } from "./models/timeline-event.interface";
import { HostDirective } from "./services/dynamic-host.directive";
import { Store } from "@ngrx/store";
import { getCurrentEvent, getCurrentTemplate, getEvents } from "./timeline/state/timeline.reducer";
import * as timelineActions from "./timeline/state/timeline.actions";
import { componentMap } from "./state/app.state";
import { Observable } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  open: boolean = false;
  @ViewChild(HostDirective, { static: true }) host: HostDirective;

  protected NgxTimelineEventChangeSideInGroup = NgxTimelineEventChangeSideInGroup;
  events$: Observable<CustomTimelineEvent[]>

  constructor(private store: Store<any>) {

    this.store.dispatch(timelineActions.loadEvents());
    this.events$ = this.store.select(getEvents)

    // this.store.dispatch(timelineActions.loadEvents({ events: [...this.events] }));

    this.store.select(getCurrentTemplate).subscribe((value) => {
      console.log('Selected template', value);
      if (value) {
        this.loadComponent(componentMap.get(value));
      } else {
        this.host?.viewContainerRef.clear();
      }
    });

    this.store.select(getCurrentEvent).subscribe((value) => {
      console.log('current', value);
      this.open = !!(value);

      if (!this.open) {
        this.host?.viewContainerRef.clear();
      } else {
        // load component template
      }
    });
  }

  loadComponent(component?: Type<any>) {
    if (this.host) {
      const viewContainerRef = this.host.viewContainerRef;
      viewContainerRef.clear();

      if (component) {
        const componentRef = viewContainerRef.createComponent(component);
        // Pass data to the component
      }

    }
  }

}
