import { Injectable } from "@angular/core";
import { UnabridgedOptions } from "./models/unabridged-options.interface";
import { Observable, of } from "rxjs";

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
    return of(JSON.parse(options));
  }
}
