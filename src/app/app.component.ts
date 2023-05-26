import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NgxTimelineEventChangeSideInGroup } from "@frxjs/ngx-timeline";
import { CustomTimelineEvent } from "./shared/models/timeline-event.interface";
import { Store } from "@ngrx/store";
import { getCurrentEvent, getCurrentTemplate, getEvents } from "./modules/timeline/state/timeline.reducer";
import * as timelineActions from "./modules/timeline/state/timeline.actions";
import { Observable } from "rxjs";
import { ComponentLoaderService } from "./shared/services/component-loader.service";
import { AppState } from "./state/app.state";
import { UnabridgedState } from "./modules/unabridged/store/unabridged-store.state";
import { UnabridgedStoreActions } from "./modules/unabridged/store";
import { ApostilleState } from "./modules/apostille/store/apostille.state";
import { ApostilleActions } from "./modules/apostille/store";

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

  constructor(private store: Store<AppState>,
    private unabridgedStore: Store<UnabridgedState>,
    private apostilleStore: Store<ApostilleState>,
    private componentLoader: ComponentLoaderService) {

    this.store.dispatch(timelineActions.loadEvents());
    this.store.dispatch(timelineActions.getCurrent());
    this.unabridgedStore.dispatch(UnabridgedStoreActions.getConfig());
    this.apostilleStore.dispatch(ApostilleActions.getSaved());

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
