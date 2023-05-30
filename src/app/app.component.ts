import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NgxDateFormat, NgxTimelineEventChangeSideInGroup } from "@frxjs/ngx-timeline";
import { CustomTimelineEvent } from "./shared/models/timeline-event.interface";
import { Store } from "@ngrx/store";
import * as timelineActions from "./modules/timeline/state/timeline.actions";
import { Observable } from "rxjs";
import { ComponentLoaderService } from "./shared/services/component-loader.service";
import { AppState } from "./state/app.state";
import { UnabridgedStoreActions } from "./modules/unabridged/store";
import { ApostilleActions } from "./modules/apostille/store";
import { PoliceClearanceActions } from "./modules/police-clearance/store";
import { TimelineSelectors } from "./modules/timeline/state";
import { GatherDocsActions } from "./modules/gather-documents/store";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('containerRef', { read: ViewContainerRef, static: true }) containerRef!: ViewContainerRef;

  ngxDateFormat = NgxDateFormat;

  events$: Observable<CustomTimelineEvent[]>
  currentEvent$: Observable<CustomTimelineEvent>;
  ngxTimelineEventChangeSideInGroup = NgxTimelineEventChangeSideInGroup;

  constructor(private store: Store<AppState>,

    private componentLoader: ComponentLoaderService) {

    this.store.dispatch(timelineActions.loadEvents());
    this.store.dispatch(timelineActions.getCurrent());
    this.store.dispatch(UnabridgedStoreActions.getConfig());
    this.store.dispatch(ApostilleActions.getConfig());
    this.store.dispatch(PoliceClearanceActions.getConfig());
    this.store.dispatch(GatherDocsActions.getConfig());

    this.events$ = this.store.select(TimelineSelectors.getEvents);

    this.currentEvent$ = this.store.select(TimelineSelectors.getCurrentEvent);
  }

  ngOnInit(): void {
    this.store.select(TimelineSelectors.getCurrentTemplate).subscribe((component) => {
        if (component) {
          this.componentLoader.loadComponent(component, this.containerRef);
        } else {
          this.containerRef?.clear();
        }
      }
    );
  }

}
