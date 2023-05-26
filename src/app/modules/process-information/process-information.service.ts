import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { IProcessInformation } from "./models/process-information";
import { initialState, ProcessInformationState } from "./store/process-info-store.state";

export abstract class IProcessInformationService {
  abstract updateOptions(options: IProcessInformation): Observable<IProcessInformation>;

  abstract getOptions(): Observable<ProcessInformationState>;
}

@Injectable()
export class ProcessInformationLocalService implements IProcessInformationService {
  getOptions(): Observable<ProcessInformationState> {
    const options = localStorage.getItem('processInformation');
    let result: ProcessInformationState;

    if (!options) {
      // Initialize it with the default values
      result = {...initialState};
    } else {
      result = {...JSON.parse(options)}
    }

    return of(result);
  }

  updateOptions(options: IProcessInformation): Observable<IProcessInformation> {
    localStorage.setItem('processInformation', JSON.stringify(options))
    return of(options);
  }

}

