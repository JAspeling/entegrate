import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { timelineReducer } from "./state/timeline.reducer";
import { TimelineService } from "./timeline.service";
import { EffectsModule } from "@ngrx/effects";
import { TimelineEffects } from "./state/timeline.effects";

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('timeline', timelineReducer),
    EffectsModule.forFeature([
      TimelineEffects
    ])
  ],
  providers: [
    TimelineService
  ]
})
export class TimelineModule {

}
