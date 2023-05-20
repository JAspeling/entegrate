import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { toggleProcessInformation } from "../store/process-information-store.actions";
import { getIsOpen } from "../store/process-information-store.selectors";
import { Store } from "@ngrx/store";
import { AppState } from "../../state/app.state";
import { ProcessInformationState } from "../store/process-info-store.state";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-process-information',
  templateUrl: './process-information.component.html'
})
export class ProcessInformationComponent implements OnInit {
  isOpen$: Observable<boolean>;

  booleanOptions = [
    { value: true, label: 'Yes' },
    { value: false, label: 'No' }
  ]
  form: FormGroup;

  constructor(private store: Store<ProcessInformationState>) {
    this.form = new FormBuilder().group({
      amountOfPeople: 1,
      euCitizen: false,
      partner: false,
      children: false,
      childrenAmount: 0,
      pets: true,
      petsAmount: 2,
    })
  }

  toggleOpen() {
    this.store.dispatch(toggleProcessInformation());
  }

  ngOnInit(): void {
    this.isOpen$ = this.store.select(getIsOpen);
  }
}
