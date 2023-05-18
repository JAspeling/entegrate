import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NgxTimelineEventChangeSideInGroup } from "@frxjs/ngx-timeline";
import { CustomTimelineEvent } from "./models/timeline-event.interface";
import { Store } from "@ngrx/store";
import { getCurrentEvent, getCurrentTemplate, getEvents } from "./timeline/state/timeline.reducer";
import * as timelineActions from "./timeline/state/timeline.actions";
import { Observable } from "rxjs";
import { ComponentLoaderService } from "./services/component-loader.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('containerRef', { read: ViewContainerRef, static: true }) containerRef!: ViewContainerRef;
  events$: Observable<CustomTimelineEvent[]>
  currentEvent$: Observable<CustomTimelineEvent>;
  protected NgxTimelineEventChangeSideInGroup = NgxTimelineEventChangeSideInGroup;

  constructor(private store: Store<any>, private componentLoader: ComponentLoaderService) {

    this.store.dispatch(timelineActions.loadEvents());
    this.store.dispatch(timelineActions.getCurrent());
    this.events$ = this.store.select(getEvents);

    this.currentEvent$ = this.store.select(getCurrentEvent);
  }

  ngOnInit(): void {
    this.store.select(getCurrentTemplate).subscribe((component) => {
        if (component) {
          this.componentLoader.loadComponent(component, this.containerRef);
        } else {
          this.containerRef?.clear();
        }
      }
    );
  }

}
