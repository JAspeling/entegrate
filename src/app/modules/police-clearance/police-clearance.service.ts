import { initialState, PoliceClearanceState } from "./store/police-clearance-store.state";
import { Injectable } from "@angular/core";
import { GenericLocalService } from "../../shared/services/generic-local-service";

export abstract class IPoliceClearanceService  extends GenericLocalService<PoliceClearanceState> {}

@Injectable()
export class PoliceClearanceService  extends GenericLocalService<PoliceClearanceState> {
  override storeName: string = 'police-clearance';
  override initialState: PoliceClearanceState = initialState;
}
