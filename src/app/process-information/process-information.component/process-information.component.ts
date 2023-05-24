import { Component, OnInit } from "@angular/core";
import { Observable, Subscription, tap } from "rxjs";
import { toggleProcessInformation, updateProcessInformation } from "../store/process-information-store.actions";
import { getIsOpen } from "../store/process-information-store.selectors";
import { Store } from "@ngrx/store";
import { initialState, ProcessInformationState } from "../store/process-info-store.state";
import { FormBuilder, FormGroup } from "@angular/forms";
import { IProcessInformation } from "../models/process-information";
import { ProcessInfoActions, ProcessInfoSelectors } from "../store";
import { ProcessInformationStoreEffects } from "../store/process-information-store.effects";
import { ToastrService } from "ngx-toastr";
import { AutoUnsubscribe } from "../../utils/decorators/auto-unsubscribe";

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
    this.form = new FormBuilder().group<IProcessInformation>({
      ...initialState
    })

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

  toggleOpen() {
    this.store.dispatch(toggleProcessInformation());
  }

  ngOnInit(): void {
    this.isOpen$ = this.store.select(getIsOpen);
  }

  save() {
    this.store.dispatch(updateProcessInformation({ options: this.form.value }));
  }
}
