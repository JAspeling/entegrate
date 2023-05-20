import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { IProcessInformation } from "./models/process-information";
import { UnabridgedOptions } from "../unabridged-information/models/unabridged-options.interface";
import { initialState } from "./store/process-info-store.state";

export abstract class IProcessInformationService {
  abstract updateOptions(options: IProcessInformation): Observable<IProcessInformation>;

  abstract getOptions(): Observable<IProcessInformation>;
}

@Injectable()
export class ProcessInformationLocalService implements IProcessInformationService {
  getOptions(): Observable<IProcessInformation> {
    const options = localStorage.getItem('processInformation');
    let result: IProcessInformation;

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

