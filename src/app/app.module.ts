import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgxTimelineModule } from "@frxjs/ngx-timeline";
import { EventComponent } from "./event-component/event.component";
import { UnabridgedInformationComponent } from "./unabridged-information/unabridged-information.component";
import { HostDirective } from "./services/dynamic-host.directive";

@NgModule({
  declarations: [
    AppComponent,
    EventComponent,
    UnabridgedInformationComponent,
    HostDirective
  ],
  imports: [
    BrowserModule,
    NgxTimelineModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
