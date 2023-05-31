import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { processInformationReducer } from "./store/process-information-store.reducer";
import { initialState } from "./store/process-info-store.state";
import { IProcessInformationService, ProcessInformationLocalService } from "./process-information.service";
import { ProcessInformationComponent } from "./process-information.component";
import { EffectsModule } from "@ngrx/effects";
import { ProcessInformationStoreEffects } from "./store/process-information-store.effects";
import { SharedModule } from "../../shared/shared.module";
import { NgbInputDatepicker } from "@ng-bootstrap/ng-bootstrap";
import { DropdownComponent } from "../inputs/dropdown.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    StoreModule.forFeature('processInformation', processInformationReducer),
    EffectsModule.forFeature([
      ProcessInformationStoreEffects
    ]),
    ReactiveFormsModule,

    SharedModule,
    NgbInputDatepicker,
    DropdownComponent
  ],
  declarations: [
    ProcessInformationComponent
  ],
  exports: [
    ProcessInformationComponent
  ],
  providers: [
    {
      provide: IProcessInformationService,
      useClass: ProcessInformationLocalService
    }
  ]
})
export class ProcessInformationModule {
  constructor() {
    this.init();
  }

  init() {
    if (localStorage.getItem('processInformation') === null) {
      console.log('Initializing localStorage with initial processInformation state');
      localStorage.setItem('processInformation', JSON.stringify(initialState));
    }
  }
}
