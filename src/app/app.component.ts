import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NgxTimelineEventChangeSideInGroup } from "@frxjs/ngx-timeline";
import { CustomTimelineEvent } from "./models/timeline-event.interface";
import { Store } from "@ngrx/store";
import { getCurrentEvent, getCurrentTemplate, getEvents } from "./timeline/state/timeline.reducer";
import * as timelineActions from "./timeline/state/timeline.actions";
import { Observable } from "rxjs";
import { ComponentLoaderService } from "./services/component-loader.service";
import { AppState } from "./state/app.state";
import { FormBuilder, FormGroup } from "@angular/forms";
import { toggleProcessInformation } from "./process-information/store/process-information-store.actions";
import { getIsOpen } from "./process-information/store/process-information-store.selectors";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('containerRef', { read: ViewContainerRef, static: true }) containerRef!: ViewContainerRef;
  events$: Observable<CustomTimelineEvent[]>
  form: FormGroup;
  currentEvent$: Observable<CustomTimelineEvent>;
  protected NgxTimelineEventChangeSideInGroup = NgxTimelineEventChangeSideInGroup;

  booleanOptions = [
    { value: true, label: 'Yes' },
    { value: false, label: 'No' }
  ]

  constructor(private store: Store<AppState>, private componentLoader: ComponentLoaderService) {

    this.store.dispatch(timelineActions.loadEvents());
    this.store.dispatch(timelineActions.getCurrent());
    this.events$ = this.store.select(getEvents);

    this.currentEvent$ = this.store.select(getCurrentEvent);

    this.form = new FormBuilder().group({
      amountOfPeople: 1,
      euCitizen: false,
      partner: false,
      children: false,
      childrenAmount: 0,
      pets: true,
      petsAmount: 2,
    })
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

    this.isOpen$ = this.store.select(getIsOpen);
  }

  isOpen$: Observable<boolean>;

  toggleOpen() {
    this.store.dispatch(toggleProcessInformation());
  }
}
