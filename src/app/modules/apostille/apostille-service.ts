import { Injectable } from "@angular/core";
import { ApostilleState, initialState } from "./store/apostille.state";
import { Observable, of } from "rxjs";

export abstract class IApostilleService {
  abstract getSaved(): Observable<ApostilleState>;
  abstract update(config: ApostilleState): Observable<ApostilleState>;
}

@Injectable()
export class ApostilleService implements IApostilleService {
  constructor() {}

  getSaved(): Observable<ApostilleState> {
    const options = localStorage.getItem('apostille');
    let result: ApostilleState;

    if (!options) {
      // Initialize it with the default values
      result = {...initialState};
    } else {
      result = {...JSON.parse(options)}
    }

    return of(result);
  }

  update(config: ApostilleState): Observable<ApostilleState> {
    localStorage.setItem('apostille', JSON.stringify(config))
    return of(config);
  }
}
