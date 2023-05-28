import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ApostilleComponent } from "./apostille.component";
import { StoreModule } from "@ngrx/store";
import { apostilleReducer } from "./store/apostille.reducer";
import { ApostilleEffects } from "./store/apostille-effects";
import { EffectsModule } from "@ngrx/effects";
import { ApostilleService, IApostilleService } from "./apostille-service";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,

        StoreModule.forFeature('apostille', apostilleReducer),
        EffectsModule.forFeature([ApostilleEffects]),
        ReactiveFormsModule,
        SharedModule,
    ],
  providers: [
    {
      provide: IApostilleService,
      useClass: ApostilleService
    }
  ],
  declarations: [
    ApostilleComponent
  ],
  exports: [
    ApostilleComponent
  ]
})
export class ApostilleModule {
}
