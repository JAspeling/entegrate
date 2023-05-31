import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { apostilleReducer } from "./apostille.reducer";
import { EffectsModule } from "@ngrx/effects";
import { ApostilleEffects } from "./apostille-effects";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('apostille', apostilleReducer),
    EffectsModule.forFeature([ApostilleEffects]),
  ]
})
export class ApostilleStoreModule {

}
