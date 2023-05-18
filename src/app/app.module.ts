import { NgModule, isDevMode, createEnvironmentInjector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgxTimelineModule } from "@frxjs/ngx-timeline";
import { EventComponent } from "./event-component/event.component";
import { UnabridgedInformationComponent } from "./unabridged-information/unabridged-information.component";
import { HostDirective } from "./services/dynamic-host.directive";
import { StoreModule } from '@ngrx/store';
import { timelineReducer } from "./timeline/state/timeline.reducer";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducer } from "./state/app.reducer";
import { unabridgedReducer } from "./unabridged-information/state/unabridged.reducer";
import { FormsModule } from "@angular/forms";
import { EffectsModule } from '@ngrx/effects';
import { TimelineModule } from "./timeline/timeline.module";
import { ComponentLoaderService } from "./services/component-loader.service";
import { UnabridgedModule } from "./unabridged-information/unabridged.module";

@NgModule({
  declarations: [
    AppComponent,
    EventComponent
  ],
  imports: [
    BrowserModule,
    NgxTimelineModule,

    StoreModule.forRoot({
      'app': appReducer
    }, {
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false
      }
    }),
    StoreDevtoolsModule.instrument({
      name: 'Entegrate',
      maxAge: 50,
      logOnly: !isDevMode()
    }),
    EffectsModule.forRoot([]),

    TimelineModule,
    UnabridgedModule
  ],
  providers: [
    ComponentLoaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
