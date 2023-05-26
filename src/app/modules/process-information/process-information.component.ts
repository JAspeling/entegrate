import { Component, OnInit } from "@angular/core";
import { Observable, Subscription, tap } from "rxjs";
import { toggleProcessInformation, updateProcessInformation } from "./store/process-information-store.actions";
import { getIsOpen } from "./store/process-information-store.selectors";
import { Store } from "@ngrx/store";
import { initialState, ProcessInformationState } from "./store/process-info-store.state";
import { FormBuilder, FormGroup, ValidationErrors } from "@angular/forms";
import { IProcessInformation } from "./models/process-information";
import { ProcessInfoActions, ProcessInfoSelectors } from "./store";
import { ProcessInformationStoreEffects } from "./store/process-information-store.effects";
import { ToastrService } from "ngx-toastr";
import { AutoUnsubscribe } from "../../shared/decorators/auto-unsubscribe";
import { getFirstErrorFromControl, touchedControlHasError } from "ng-form-validator-builder";

@Component({
  selector: 'app-process-information',
  templateUrl: './process-information.component.html'
})
@AutoUnsubscribe()
export class ProcessInformationComponent implements OnInit {
  isOpen$: Observable<boolean>;
  getProcessInformation: Subscription;
  processInformationUpdated: Subscription;
  formSubscription: Subscription;

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
          this.form.patchValue(options);
        })
      ).subscribe();

    this.processInformationUpdated =
      this.effects.update$.pipe(tap(() => {
          this.toastService.success('Updated');
        })
      ).subscribe();

  }

  get includeChildren(): boolean {
    return this.form?.get('children')?.value;
  }

  get includePets(): boolean {
    return this.form?.get('pets')?.value;
  }

  validateFormGroup(): ValidationErrors {
    return (group: FormGroup): ValidationErrors => {
      // Do any custom validation here.

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
      peopleCount: 0
    }, { validator: this.validateFormGroup() });

    this.formSubscription = this.form.valueChanges.subscribe((value) => {
      this.setApplicationAmount();
    });

    this.form.get('euCitizenship').disable();
    this.form.get('peopleCount').disable();
  }

  private setApplicationAmount() {
    let amount = 1;
    amount += this.form.get('partner').value ? 1 : 0;
    amount += this.form.get('children').value ? this.form.get('childrenCount').value : 0;

    this.form.get('peopleCount').setValue(amount, { emitEvent: false });
  }
}
