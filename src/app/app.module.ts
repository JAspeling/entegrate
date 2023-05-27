import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgxTimelineModule } from "@frxjs/ngx-timeline";
import { EventComponent } from "./modules/event-component/event.component";
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducer } from "./state/app.reducer";
import { EffectsModule } from '@ngrx/effects';
import { TimelineModule } from "./modules/timeline/timeline.module";
import { ComponentLoaderService } from "./shared/services/component-loader.service";
import { UnabridgedModule } from "./modules/unabridged/unabridged.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { AppEffects } from "./state/app.effects";
import { ReactiveFormsModule } from "@angular/forms";
import { ProcessInformationModule } from "./modules/process-information/process-information.module";
import { SharedModule } from "./shared/shared.module";
import { TimeIndicatorModule } from "./modules/time-indicator/time-indicator.module";
import { ApostilleModule } from "./modules/apostille/apostille.module";
import { PoliceClearanceModule } from "./modules/police-clearance/police-clearance.module";
import { GatherDocumentsModule } from "./modules/gather-documents/gather-documents.module";

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
    EffectsModule.forRoot([AppEffects]),


    SharedModule,
    GatherDocumentsModule,
    TimelineModule,
    UnabridgedModule,
    ProcessInformationModule,
    TimeIndicatorModule,
    ApostilleModule,
    PoliceClearanceModule
  ],
  providers: [
    ComponentLoaderService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
