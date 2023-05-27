import { Injectable } from "@angular/core";
import { initialState, ProcessInformationState } from "./store/process-info-store.state";
import { GenericService } from "../../shared/services/generic-io-service";

export abstract class IProcessInformationService extends GenericService<ProcessInformationState> {
}

@Injectable()
export class ProcessInformationLocalService extends GenericService<ProcessInformationState> {
  override storeName: string = 'processInformation';
  override initialState: ProcessInformationState = initialState;
}

