import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ApostilleComponent } from "./apostille.component";
import { StoreModule } from "@ngrx/store";
import { apostilleReducer } from "./store/apostille.reducer";

@NgModule({
  imports: [
    CommonModule,

    StoreModule.forFeature('apostille', apostilleReducer),
    // EffectsModule.forFeature([UnabridgedStoreEffects]),
  ],
  providers: [],
  declarations: [
    ApostilleComponent
  ],
  exports: [
    ApostilleComponent
  ]
})
export class ApostilleModule {
}
