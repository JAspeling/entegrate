import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { policeClearanceReducer } from "./store/police-clearance-store.reducer";
import { PoliceClearanceComponent } from "./police-clearance.component";
import { ReactiveFormsModule } from "@angular/forms";
import { IPoliceClearanceService, PoliceClearanceService } from "./police-clearance.service";
import { EffectsModule } from "@ngrx/effects";
import { PoliceClearanceStoreEffects } from "./store/police-clearance-store.effects";

@NgModule({
  imports: [
    CommonModule,

    StoreModule.forFeature('police-clearance', policeClearanceReducer),
    EffectsModule.forFeature([PoliceClearanceStoreEffects]),
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: IPoliceClearanceService,
      useClass: PoliceClearanceService
    }
  ],
  declarations: [
    PoliceClearanceComponent
  ],
  exports: [
    PoliceClearanceComponent
  ]
})
export class PoliceClearanceModule {

}
