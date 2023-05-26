import { NgModule } from "@angular/core";
import { UnabridgedInformationComponent } from "./unabridged-information.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { IUnabridgedService, UnabridgedLocalService, } from "./unabridged.service";
import { unabridgedStoreReducer } from "./store/unabridged-store.reducer";
import { UnabridgedStoreEffects } from "./store/unabridged-store.effects";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    StoreModule.forFeature('unabridged', unabridgedStoreReducer),
    EffectsModule.forFeature([UnabridgedStoreEffects]),
    ReactiveFormsModule
  ],
  declarations: [UnabridgedInformationComponent],
  providers: [
    {
      provide: IUnabridgedService,
      useClass: UnabridgedLocalService
    }
  ]
})
export class UnabridgedModule {
  constructor() {
  }
}
