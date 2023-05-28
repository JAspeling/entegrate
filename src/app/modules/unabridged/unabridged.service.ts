import { Injectable } from "@angular/core";
import { initialState, UnabridgedState } from "./store/unabridged-store.state";
import { GenericLocalService } from "../../shared/services/generic-local-service";

export abstract class IUnabridgedService extends GenericLocalService<UnabridgedState> {}

@Injectable()
export class UnabridgedLocalService extends GenericLocalService<UnabridgedState> {
  override storeName: string = 'unabridged';
  override initialState: UnabridgedState = initialState;
}
