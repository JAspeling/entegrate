import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { petsReducer } from "./pets.reducer";
import { EffectsModule } from "@ngrx/effects";
import { PetsEffects } from "./pets.effects";

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('pets', petsReducer),
    EffectsModule.forFeature(PetsEffects)
  ],
})
export class PetsStoreModule {

}
