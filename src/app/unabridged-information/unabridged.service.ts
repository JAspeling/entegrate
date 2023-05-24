import { Injectable } from "@angular/core";
import { UnabridgedConfig } from "./models/unabridged-options.interface";
import { Observable, of } from "rxjs";
import { initialState } from "./store/unabridged-store.state";

export abstract class IUnabridgedService {
  abstract updateOptions(options: UnabridgedConfig): Observable<UnabridgedConfig>;

  abstract getOptions(): Observable<UnabridgedConfig>;
}

@Injectable()
export class UnabridgedLocalService implements IUnabridgedService {
  updateOptions(options: UnabridgedConfig): Observable<UnabridgedConfig> {
    localStorage.setItem('unabridgedOptions', JSON.stringify(options))
    return of(options);
  }

  getOptions(): Observable<UnabridgedConfig> {
    const options = localStorage.getItem('unabridgedOptions');
    let result: UnabridgedConfig;

    if (!options) {
      // Initialize it with the default values
      result = {...initialState};
    } else {
      result = {...JSON.parse(options)}
    }

    return of(result);
  }
}
