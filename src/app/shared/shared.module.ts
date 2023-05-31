import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ScrollChangeDirective } from "./directives/scroll-change-directive";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    ScrollChangeDirective,
  ],
  exports: [
    ScrollChangeDirective,
  ],
  providers: []
})
export class SharedModule {

}
