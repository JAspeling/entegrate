import { Component, ComponentFactoryResolver, TemplateRef, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { NgxTimelineEvent, NgxTimelineEventChangeSideInGroup } from "@frxjs/ngx-timeline";
import { InformationService } from "./services/information-service";
import { CustomTimelineEvent } from "./models/timeline-event.interface";
import { HostDirective } from "./services/dynamic-host.directive";
import { UnabridgedInformationComponent } from "./unabridged-information/unabridged-information.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'entegrate';
  events: CustomTimelineEvent[] = [
    {
      id: '1',
      template: UnabridgedInformationComponent,
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

  constructor(private viewContainerRef: ViewContainerRef,
    private informationService: InformationService) {
    this.informationService.state$.subscribe(state => {
      if (this.host) {
        this.open = state !== undefined;

        if (!state) {
          this.host.viewContainerRef.clear();
        } else {
          this.events.filter(ev => ev.id !== state?.id).forEach(event => {
            event.active = false;
          });
        }
      }

    });

    this.informationService.template$.subscribe(template => {
      this.loadComponent(template);
    });
  }

  loadComponent(component: Type<any>) {
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
