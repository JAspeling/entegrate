import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { policeClearanceReducer } from "./store/police-clearance-store.reducer";
import { PoliceClearanceComponent } from "./police-clearance.component";

@NgModule({
  imports: [
    CommonModule,

    StoreModule.forFeature('police-clearance', policeClearanceReducer)
  ],
  providers: [],
  declarations: [
    PoliceClearanceComponent
  ],
  exports: [
    PoliceClearanceComponent
  ]
})
export class PoliceClearanceModule {

}
