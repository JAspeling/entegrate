import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgxTimelineModule } from "@frxjs/ngx-timeline";
import { EventComponent } from "./modules/timeline/event-component/event.component";
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducer } from "./state/app.reducer";
import { EffectsModule } from '@ngrx/effects';
import { TimelineModule } from "./modules/timeline/timeline.module";
import { ComponentLoaderService } from "./shared/services/component-loader.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { ReactiveFormsModule } from "@angular/forms";
import { ProcessInformationModule } from "./modules/process-information/process-information.module";
import { SharedModule } from "./shared/shared.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GatherDocsService, IGatherDocsService } from "./modules/gather-documents/gather-document.service";
import { IPoliceClearanceService, PoliceClearanceService } from "./modules/police-clearance/police-clearance.service";
import { IUnabridgedService, UnabridgedLocalService } from "./modules/unabridged/unabridged.service";
import { ApostilleService, IApostilleService } from "./modules/apostille/apostille-service";
import { UnabridgedInformationComponent } from "./modules/unabridged/unabridged-information.component";
import { ApostilleComponent } from "./modules/apostille/apostille.component";
import { PoliceClearanceComponent } from "./modules/police-clearance/police-clearance.component";
import { GatherDocumentsComponent } from "./modules/gather-documents/gather-documents.component";
import { TimeIndicatorComponent } from "./modules/time-indicator/time-indicator.component";
import { IMvvService, LocalMvvService } from "./modules/mvv/mvv-service";
import { MvvComponent } from "./modules/mvv/mvv.component";

@NgModule({
  declarations: [
    AppComponent,
    EventComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    NgxTimelineModule,
    ToastrModule.forRoot(),
    NgbModule,

    UnabridgedInformationComponent,
    ApostilleComponent,
    PoliceClearanceComponent,
    GatherDocumentsComponent,
    TimeIndicatorComponent,
    MvvComponent,

    StoreModule.forRoot({
      'app': appReducer
    }, {
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
      }
    }),
    StoreDevtoolsModule.instrument({
      name: 'Entegrate',
      logOnly: !isDevMode()
    }),
    EffectsModule.forRoot(),


    SharedModule,
    TimelineModule,
    ProcessInformationModule,
    NgbModule
  ],
  providers: [
    ComponentLoaderService,
    { provide: IGatherDocsService, useClass: GatherDocsService },
    { provide: IPoliceClearanceService, useClass: PoliceClearanceService },
    { provide: IUnabridgedService, useClass: UnabridgedLocalService },
    { provide: IApostilleService, useClass: ApostilleService },
    { provide: IMvvService, useClass: LocalMvvService },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
