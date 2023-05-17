import { Component, ComponentFactoryResolver, TemplateRef, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { NgxTimelineEvent, NgxTimelineEventChangeSideInGroup } from "@frxjs/ngx-timeline";
import { InformationService } from "./services/information-service";
import { CustomTimelineEvent } from "./models/timeline-event.interface";
import { HostDirective } from "./services/dynamic-host.directive";
import { UnabridgedInformationComponent } from "./unabridged-information/unabridged-information.component";
import { Store } from "@ngrx/store";
import { getCurrentEvent, getCurrentTemplate, getEvents } from "./timeline/state/timeline.reducer";
import * as timelineActions from "./timeline/state/timeline.actions";
import { componentMap } from "./state/app.state";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  events: CustomTimelineEvent[] = [
    {
      id: '1',
      template: 'UnabridgedInformationComponent',
      title: 'Unabridged certificates',
      description: 'You’ll need to apply for your unabridged birth and/or marriage certificate from the Department of Home Affairs',
      timestamp: new Date(),
      duration: {
        minimum: 3,
        maximum: 6,
        average: 4.5
      },
      alternatives: [
        {
          title: 'Using a third party',
          description: 'You can use a third party to apply for your unabridged birth and/or marriage certificate',
          duration: {
            minimum: 1,
            maximum: 6,
            average: 3.5
          },
        },
        {
          title: 'Doing it yourself',
          description: 'You can apply for your unabridged birth and/or marriage certificate yourself ath the Department of Home Affairs',
          duration: {
            minimum: 6,
            maximum: 12,
            average: 9
          },
          cost: {
            minimum: 0,
            maximum: 3000,
            average: 0
          }
        },
      ]
    }, {
      id: '2',
      title: 'Event 2',
      timestamp: new Date(),
    }, {
      id: '3',
      title: 'Event 3',
      timestamp: new Date(),
    }, {
      id: '4',
      title: 'Event 4',
      timestamp: new Date(),
    }
  ];
  open: boolean = false;
  @ViewChild(HostDirective, { static: true }) host: HostDirective;

  protected NgxTimelineEventChangeSideInGroup = NgxTimelineEventChangeSideInGroup;

  constructor(private store: Store<any>) {

    this.store.dispatch(timelineActions.addEvents({ events: [...this.events] }));

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
