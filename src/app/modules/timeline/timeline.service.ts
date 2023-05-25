import { Injectable } from "@angular/core";
import { CustomTimelineEvent } from "../../shared/models/timeline-event.interface";
import { Observable, of } from "rxjs";
import { timelineData } from "./timeline.data";

@Injectable()
export class TimelineService {
  getProducts(): Observable<CustomTimelineEvent[]>  {
    return of(timelineData);
  }

  getCurrentId(): Observable<string> {
    return of(localStorage.getItem('currentEventId'));
  }

  setCurrentId(id: string): Observable<string> {
    // TODO: Make a localstorage service that will persist data in localstorage under a namespace
    localStorage.setItem('currentEventId', id);
    return of(id);
  }
}
