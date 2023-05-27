import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ScrollChangeDirective } from "./directives/scroll-change-directive";
import { AdditionalTemplateComponent } from "./additional-template.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    ScrollChangeDirective,
    AdditionalTemplateComponent
  ],
  exports: [
    ScrollChangeDirective,
    AdditionalTemplateComponent
  ],
  providers: []
})
export class SharedModule {

}
