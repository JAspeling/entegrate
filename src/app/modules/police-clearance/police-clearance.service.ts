import { PoliceClearanceState } from "./store/police-clearance-store.state";
import { Injectable } from "@angular/core";
import { initialState } from "../apostille/store/apostille.state";
import { Observable, of } from "rxjs";

export abstract class IPoliceClearanceService {
  abstract update(action: PoliceClearanceState): Observable<PoliceClearanceState>;
  abstract getSaved(): Observable<PoliceClearanceState>;
}

@Injectable()
export class PoliceClearanceService implements IPoliceClearanceService {
  getSaved(): Observable<PoliceClearanceState> {
    const options = localStorage.getItem('police-clearance');
    let result: PoliceClearanceState;

    if (!options) {
      // Initialize it with the default values
      result = {...initialState};
    } else {
      result = {...JSON.parse(options)}
    }

    return of(result);
  }

  update(action: PoliceClearanceState): Observable<PoliceClearanceState> {
    localStorage.setItem('police-clearance', JSON.stringify(action))
    return of(action);
  }

}
