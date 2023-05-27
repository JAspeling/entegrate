import { Injectable } from "@angular/core";
import { GenericService } from "../../shared/services/generic-io-service";
import { GatherDocsState, initialState } from "./store/gather-documents.state";

export abstract class IGatherDocsService extends GenericService<GatherDocsState> {}

@Injectable()
export class GatherDocsService extends GenericService<GatherDocsState> {
  override  storeName: string = 'gather-docs';
  override initialState: GatherDocsState = initialState;
}
