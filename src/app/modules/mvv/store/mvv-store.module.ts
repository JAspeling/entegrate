import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { mvvReducer } from "./mvv.reducer";
import { MvvEffects } from "./mvv.effects";
import { EffectsModule } from "@ngrx/effects";

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('mvv', mvvReducer),
    EffectsModule.forFeature(MvvEffects)
  ]
})
export class MvvStoreModule {

}
