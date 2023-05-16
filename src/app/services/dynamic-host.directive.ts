import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
  selector: '[componentHost]',
})
export class HostDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
