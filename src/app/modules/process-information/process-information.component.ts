import { Component, OnInit } from "@angular/core";
import { Observable, Subscription, tap } from "rxjs";
import { toggleProcessInformation, updateProcessInformation } from "./store/process-information-store.actions";
import { getIsOpen } from "./store/process-information-store.selectors";
import { Store } from "@ngrx/store";
import { initialState, ProcessInformationState } from "./store/process-info-store.state";
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";
import { ProcessInfoActions, ProcessInfoSelectors } from "./store";
import { ProcessInformationStoreEffects } from "./store/process-information-store.effects";
import { ToastrService } from "ngx-toastr";
import { AutoUnsubscribe } from "../../shared/decorators/auto-unsubscribe";
import { ofType } from "@ngrx/effects";
import { TimelineActions } from "../timeline/state";
import { TimelineService } from "../timeline/timeline.service";
import { DropdownOption } from "../inputs/dropdown.component";

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

  _booleanOptions: DropdownOption<boolean>[] = [
    { value: true, display: 'Yes' },
    { value: false, display: 'No' },
  ]

  form: FormGroup;

  constructor(private toastService: ToastrService,
    private readonly timelineService: TimelineService,
    private store: Store<ProcessInformationState>,
    private effects: ProcessInformationStoreEffects) {
    this.initializeForm();

    this.store.dispatch(ProcessInfoActions.getProcessInformation());

    this.getProcessInformation = this.store.select(ProcessInfoSelectors.getProcessInformation)
      .pipe(
        tap((options) => {
          this.form.patchValue(options);
          this.store.dispatch(TimelineActions.updateTimestamps({ initialDate: this.form.value.startDate }))
        })
      ).subscribe();

    this.processInformationUpdated =
      this.effects.update$.pipe(
        ofType(ProcessInfoActions.updateProcessInformationSuccess),
        tap((action) => {
          this.toastService.success('Updated');
          this.store.dispatch(TimelineActions.updateTimestamps({ initialDate: this.form.value.startDate }))
        })
      ).subscribe();

  }

  get includeChildren(): boolean {
    return this.form?.get('children')?.value;
  }

  get includePets(): boolean {
    return this.form?.get('pets')?.value;
  }

  validateFormGroup(): ValidatorFn | ValidatorFn[] {
    return (group: AbstractControl): ValidationErrors | null => {
      // Do any custom validation here.

      return null;
    }
  }

  toggleOpen() {
    this.store.dispatch(toggleProcessInformation());
  }

  ngOnInit(): void {
    this.isOpen$ = this.store.select(getIsOpen);
  }

  save(event: any) {
    event.preventDefault()
    this.form.markAllAsTouched();
    if (this.form.valid && this.form.dirty) {
      this.store.dispatch(updateProcessInformation(this.form.value));
      this.form.markAsPristine();
    }
  }

  private initializeForm() {
    this.form = new FormBuilder().group<ProcessInformationState>({
      ...initialState,
      peopleCount: 0,
    }, { validators: this.validateFormGroup() });

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
