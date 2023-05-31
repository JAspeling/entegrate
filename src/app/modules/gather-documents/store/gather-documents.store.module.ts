import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { GatherDocumentsReducer } from "./gather-documents.reducer";
import { EffectsModule } from "@ngrx/effects";
import { GatherDocumentsEffects } from "./gather-documents.effects";

@NgModule({
  imports: [
    StoreModule.forFeature('gatherDocuments', GatherDocumentsReducer),
    EffectsModule.forFeature([GatherDocumentsEffects]),
  ]
})
export class GatherDocumentsStoreModule {

}
