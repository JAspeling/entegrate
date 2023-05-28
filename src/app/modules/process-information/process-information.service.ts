import { Injectable } from "@angular/core";
import { initialState, ProcessInformationState } from "./store/process-info-store.state";
import { GenericLocalService } from "../../shared/services/generic-local-service";

export abstract class IProcessInformationService extends GenericLocalService<ProcessInformationState> {
}

@Injectable()
export class ProcessInformationLocalService extends GenericLocalService<ProcessInformationState> {
  override storeName: string = 'processInformation';
  override initialState: ProcessInformationState = initialState;
}

