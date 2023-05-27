import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GatherDocumentsComponent } from "./gather-documents.component";
import { StoreModule } from "@ngrx/store";
import { GatherDocumentsReducer } from "./store/gather-documents.reducer";
import { GatherDocsService, IGatherDocsService } from "./gather-document.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EffectsModule } from "@ngrx/effects";
import { GatherDocumentsEffects } from "./store/gather-documents.effects";

@NgModule({
  declarations: [GatherDocumentsComponent],
  imports: [
    CommonModule,
    /**
     * StoreModule.forFeature('police-clearance', policeClearanceReducer),
     * EffectsModule.forFeature([PoliceClearanceStoreEffects]),
     */
    StoreModule.forFeature('gatherDocuments', GatherDocumentsReducer),
    EffectsModule.forFeature([GatherDocumentsEffects]),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [GatherDocumentsComponent],
  providers: [
    {
      provide: IGatherDocsService,
      useClass: GatherDocsService
    }
  ],
})
export class GatherDocumentsModule {

}
