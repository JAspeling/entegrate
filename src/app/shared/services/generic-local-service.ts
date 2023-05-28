import { Observable, of } from "rxjs";

export abstract class GenericLocalService<T> {
  update(action: T): Observable<T> {
    const result: any = { ...action };
    delete result.id;
    delete result.type;
    localStorage.setItem(this.storeName, JSON.stringify(result))
    return of(result);
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
