import { StoreModule } from "@ngrx/store";
import { NgModule } from "@angular/core";
import { policeClearanceReducer } from "./police-clearance-store.reducer";
import { EffectsModule } from "@ngrx/effects";
import { PoliceClearanceStoreEffects } from "./police-clearance-store.effects";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../../shared/shared.module";

@NgModule({
  imports: [
    StoreModule.forFeature('police-clearance', policeClearanceReducer),
    EffectsModule.forFeature([PoliceClearanceStoreEffects]),
    ReactiveFormsModule,
    SharedModule
  ]
})
export class PoliceClearanceStoreModule {

}
