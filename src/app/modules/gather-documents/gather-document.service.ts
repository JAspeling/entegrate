import { Injectable } from "@angular/core";
import { GatherDocsState, initialState } from "./store/gather-documents.state";
import { GenericLocalService } from "../../shared/services/generic-local-service";

export abstract class IGatherDocsService extends GenericLocalService<GatherDocsState> {}

@Injectable()
export class GatherDocsService extends GenericLocalService<GatherDocsState> {
  override  storeName: string = 'gather-docs';
  override initialState: GatherDocsState = initialState;
}
