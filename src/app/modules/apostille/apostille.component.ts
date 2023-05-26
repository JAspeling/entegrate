import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { ApostilleState } from "./store/apostille.state";
import { ApostilleSelectors } from "./store";
import { Observable } from "rxjs";

@Component({
  selector: 'app-apostille',
  templateUrl: './apostille.component.html',
})
export class ApostilleComponent {

  config$: Observable<ApostilleState>;

  constructor(private readonly store: Store<ApostilleState>) {

    this.config$ = this.store.select(ApostilleSelectors.getConfig);
  }
}
