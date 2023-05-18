import { Injectable } from "@angular/core";
import { CustomTimelineEvent } from "../models/timeline-event.interface";
import { Observable, of } from "rxjs";
import { timelineData } from "./timeline.data";

@Injectable()
export class TimelineService {
  getProducts(): Observable<CustomTimelineEvent[]>  {
    return of(timelineData);
  }
}
