import { StoreModule } from "@ngrx/store";
import { unabridgedStoreReducer } from "./unabridged-store.reducer";
import { EffectsModule } from "@ngrx/effects";
import { UnabridgedStoreEffects } from "./unabridged-store.effects";
import { NgModule } from "@angular/core";

@NgModule({
  imports: [
    StoreModule.forFeature('unabridged', unabridgedStoreReducer),
    EffectsModule.forFeature([UnabridgedStoreEffects]),
  ]
})
export class UnabridgedStoreModule {

}
