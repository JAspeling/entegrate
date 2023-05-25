import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ScrollChangeDirective } from "./directives/scroll-change-directive";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ScrollChangeDirective
    ],
  exports: [
    ScrollChangeDirective
  ],
  providers: [
  ]
})
export class SharedModule {

}
