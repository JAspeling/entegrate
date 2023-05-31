import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { mvvReducer } from "./mvv.reducer";
import { MvvEffects } from "./mvv.effects";

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('mvv', mvvReducer)
  ],
  providers: [
    MvvEffects
  ]
})
export class MvvStoreModule {

}
