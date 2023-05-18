import { NgModule } from "@angular/core";
import { UnabridgedInformationComponent } from "./unabridged-information.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { unabridgedReducer } from "./state/unabridged.reducer";
import { IUnabridgedService, UnabridgedLocalService, } from "./unabridged.service";
import { UnabridgedEffects } from "./state/unabridged.effects";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    StoreModule.forFeature('unabridged', unabridgedReducer),
    EffectsModule.forFeature([UnabridgedEffects]),
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

}
