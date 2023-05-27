// Dictionary map of the components
import { UnabridgedInformationComponent } from "../../modules/unabridged/unabridged-information.component";
import { Type } from "@angular/core";
import { ApostilleComponent } from "../../modules/apostille/apostille.component";
import { PoliceClearanceComponent } from "../../modules/police-clearance/police-clearance.component";
import { GatherDocumentsComponent } from "../../modules/gather-documents/gather-documents.component";

export const componentMap = new Map<string, Type<any>>([
  ['UnabridgedInformationComponent', UnabridgedInformationComponent],
  ['ApostilleComponent', ApostilleComponent],
  ['PoliceClearanceComponent', PoliceClearanceComponent],
  ['GatherDocumentsComponent', GatherDocumentsComponent],
]);
