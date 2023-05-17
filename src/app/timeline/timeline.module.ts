import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { timelineReducer } from "./state/timeline.reducer";

@NgModule({
  imports: [
    CommonModule,
    //StoreModule.forFeature('timeline', timelineReducer)
  ]
})
export class TimelineModule {

}
