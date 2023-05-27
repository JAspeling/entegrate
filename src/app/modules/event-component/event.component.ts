import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { NgxTimelineItem, NgxTimelineItemPosition } from "@frxjs/ngx-timeline";
import { CustomTimelineEvent } from "../../shared/models/timeline-event.interface";
import { Store } from "@ngrx/store";
import * as timelineActions from "../timeline/state/timeline.actions";
import { TimelineState } from "../timeline/state/timeline.state";
import { TimelineSelectors } from "../timeline/state";
import { AutoUnsubscribe } from "../../shared/decorators/auto-unsubscribe";
import { tap } from "rxjs";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
@AutoUnsubscribe()
export class EventComponent {
  @Input() event: NgxTimelineItem;
  active: boolean;

  itemPosition = NgxTimelineItemPosition;

  currentEventId$ = this.store.select(TimelineSelectors.getCurrentEventId)
    .pipe(
      tap((currentEventId) => {
        this.active = currentEventId === this.eventInfo.id;
      })
    )

  constructor(private store: Store<TimelineState>) {
  }

  get eventInfo(): CustomTimelineEvent {
    return this.event?.eventInfo as CustomTimelineEvent;
  }


  toggle() {
    if (this.active) {
      this.store.dispatch(timelineActions.clearCurrentEvent());
    } else {
      this.store.dispatch(timelineActions.setCurrent({ eventId: this.eventInfo.id }));
    }
  }
}
