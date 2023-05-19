import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgxTimelineModule } from "@frxjs/ngx-timeline";
import { EventComponent } from "./event-component/event.component";
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducer } from "./state/app.reducer";
import { EffectsModule } from '@ngrx/effects';
import { TimelineModule } from "./timeline/timeline.module";
import { ComponentLoaderService } from "./services/component-loader.service";
import { UnabridgedModule } from "./unabridged-information/unabridged.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { AppEffects } from "./state/app.effects";

@NgModule({
  declarations: [
    AppComponent,
    EventComponent
  ],
  imports: [
    BrowserModule,

    NgxTimelineModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),


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
      logOnly: !isDevMode()
    }),
    EffectsModule.forRoot([AppEffects]),

    TimelineModule,
    UnabridgedModule
  ],
  providers: [
    ComponentLoaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
