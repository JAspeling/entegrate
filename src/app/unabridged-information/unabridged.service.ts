import { Injectable } from "@angular/core";
import { UnabridgedOptions } from "./models/unabridged-options.interface";
import { Observable, of } from "rxjs";
import { initialState } from "./store/unabridged-store.state";

export abstract class IUnabridgedService {
  abstract updateOptions(options: UnabridgedOptions): Observable<UnabridgedOptions>;

  abstract getOptions(): Observable<UnabridgedOptions>;
}

@Injectable()
export class UnabridgedLocalService implements IUnabridgedService {
  updateOptions(options: UnabridgedOptions): Observable<UnabridgedOptions> {
    localStorage.setItem('unabridgedOptions', JSON.stringify(options))
    return of(options);
  }

  getOptions(): Observable<UnabridgedOptions> {
    const options = localStorage.getItem('unabridgedOptions');
    let result: UnabridgedOptions;

    if (!options) {
      // Initialize it with the default values
      result = {...initialState.options};
    } else {
      result = {...JSON.parse(options)}
    }

    return of(result);
  }
}
