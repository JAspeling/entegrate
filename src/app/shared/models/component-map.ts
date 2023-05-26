// Dictionary map of the components
import { UnabridgedInformationComponent } from "../../modules/unabridged/unabridged-information.component";
import { Type } from "@angular/core";
import { ApostilleComponent } from "../../modules/apostille/apostille.component";

export const componentMap = new Map<string, Type<any>>([
  ['UnabridgedInformationComponent', UnabridgedInformationComponent],
  ['ApostilleComponent', ApostilleComponent]
]);
