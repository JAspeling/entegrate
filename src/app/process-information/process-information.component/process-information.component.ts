import { Component, OnInit } from "@angular/core";
import { Observable, Subscription, tap } from "rxjs";
import { toggleProcessInformation, updateProcessInformation } from "../store/process-information-store.actions";
import { getIsOpen } from "../store/process-information-store.selectors";
import { Store } from "@ngrx/store";
import { initialState, ProcessInformationState } from "../store/process-info-store.state";
import { FormBuilder, FormControl, FormGroup, ValidationErrors } from "@angular/forms";
import { IProcessInformation } from "../models/process-information";
import { ProcessInfoActions, ProcessInfoSelectors } from "../store";
import { ProcessInformationStoreEffects } from "../store/process-information-store.effects";
import { ToastrService } from "ngx-toastr";
import { AutoUnsubscribe } from "../../decorators/auto-unsubscribe";
import {
  addError,
  getFirstErrorFromControl,
  NumericValidator,
  removeError,
  touchedControlHasError
} from "ng-form-validator-builder";

@Component({
  selector: 'app-process-information',
  templateUrl: './process-information.component.html'
})
@AutoUnsubscribe()
export class ProcessInformationComponent implements OnInit {
  isOpen$: Observable<boolean>;
  getProcessInformation: Subscription;
  processInformationUpdated: Subscription;

  booleanOptions = [
    { value: true, label: 'Yes' },
    { value: false, label: 'No' }
  ]
  form: FormGroup;

  constructor(private toastService: ToastrService, private store: Store<ProcessInformationState>, private effects: ProcessInformationStoreEffects) {
    this.initializeForm();

    this.store.dispatch(ProcessInfoActions.getProcessInformation());

    this.getProcessInformation = this.store.select(ProcessInfoSelectors.getProcessInformation)
      .pipe(
        tap((options) => {
          this.form.patchValue(options, { onlySelf: true, emitEvent: false });
        })
      ).subscribe();

    this.processInformationUpdated =
      this.effects.update$.pipe(tap(() => {
          this.toastService.success('Updated');
        })
      ).subscribe();

  }

  validateFormGroup(): ValidationErrors {
    return (group: FormGroup): ValidationErrors => {
      // Do any custom validation here.

      this.validateMarried(group);
      this.validatePartner(group);

      return null;
    }
  }

  touchedControlHasError(controlName: keyof IProcessInformation) {
    const control = this.form.get(controlName);
    return touchedControlHasError(control);
  }

  getFirstError(formControl: keyof IProcessInformation) {
    const control = this.form.get(formControl);
    return getFirstErrorFromControl(control);
  }

  toggleOpen() {
    this.store.dispatch(toggleProcessInformation());
  }

  ngOnInit(): void {
    this.isOpen$ = this.store.select(getIsOpen);
  }

  save() {
    this.form.markAllAsTouched();
    if (this.form.valid && this.form.dirty) {
      this.store.dispatch(updateProcessInformation({ options: this.form.value }));
      this.form.markAsPristine();
    }
  }

  private initializeForm() {
    this.form = new FormBuilder().group({
      ...initialState,
      peopleCount: new FormControl(0, [NumericValidator.greaterThan(0, "Please enter a valid number of people")])
    }, { validator: this.validateFormGroup() });

    this.form.get('euCitizenship').disable();
  }

  private validateMarried(group: FormGroup<any>) {
    const married = group.get('married');
    const peopleCount = group.get('peopleCount');

    if (married.value === true && peopleCount.value < 2) {
      addError(peopleCount, 'marriedCount', 'You are married, so you need to add your spouse to the application.')
    } else {
      removeError(peopleCount, 'marriedCount');
    }
  }

  private validatePartner(group: FormGroup) {
    const partner = group.get('partner');
    const peopleCount = group.get('peopleCount');

    if (partner.value === true && peopleCount.value < 2) {
      addError(peopleCount, 'partnerCount', 'You need to add your partner to the application.')
    } else {
      removeError(peopleCount, 'partnerCount');
    }
  }
}
