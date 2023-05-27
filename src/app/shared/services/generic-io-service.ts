import { Observable, of } from "rxjs";

export abstract class GenericService<T> {
  update(action: T): Observable<T> {
    localStorage.setItem(this.storeName, JSON.stringify(action))
    return of(action);

  }

  getSaved(): Observable<T> {
    const options = localStorage.getItem(this.storeName);
    let result: T;

    if (!options) {
      // Initialize it with the default values
      result = {...this.initialState};
    } else {
      result = {...JSON.parse(options)}
    }

    return of(result);
  }

  storeName: string;
  initialState: T;
}
