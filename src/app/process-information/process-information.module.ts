import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { processInformationReducer } from "./store/process-information-store.reducer";
import { initialState } from "./store/process-info-store.state";
import { IProcessInformationService, ProcessInformationLocalService } from "./process-information.service";
import { ProcessInformationComponent } from "./process-information.component/process-information.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    StoreModule.forFeature('processInformation', processInformationReducer),
    ReactiveFormsModule
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
