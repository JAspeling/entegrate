import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { FormBuilder, FormGroup } from "@angular/forms";
import { UnabridgedOptions } from "./models/unabridged-options.interface";
import { filter, Observable, Subscription } from "rxjs";
import * as timelineActions from "../timeline/state/timeline.actions";
import { ToastrService } from "ngx-toastr";
import { UnabridgedState } from "./store/unabridged-store.state";
import { UnabridgedStoreEffects } from "./store/unabridged-store.effects";
import { UnabridgedStoreActions, UnabridgedStoreSelectors } from "./store";
import { AutoUnsubscribe } from "../decorators/auto-unsubscribe";
import { ProcessInformationState } from "../process-information/store/process-info-store.state";
import { ProcessInfoSelectors } from "../process-information/store";

@Component({
  selector: 'app-unabridged-information',
  templateUrl: './unabridged-information.component.html'
})
@AutoUnsubscribe()
export class UnabridgedInformationComponent implements OnInit {
  public selectedOption?: number;
  options$: Observable<UnabridgedOptions>
  form: FormGroup;

  isMarried$: Observable<boolean>;
  isMoreThanOne$: Observable<boolean>;
  includingChildren$: Observable<boolean>;

  selections = [
    {
      title: 'I am doing this myself',
      description: 'You can organize this yourself, but we all know the pains of dealing with the Department of Home affairs. This can slow down your process a bit.',
      selected: false,
      cost: 1500, // Rands, per person. Get the latest cost from the DHA website
      time: 8 // Weeks
    },
    {
      title: 'I am using a third party',
      description: 'This is a bit more costly, but they tend to get your documents issued faster than if you would do it yourself.',
      selected: false,
      cost: 5000, // Rands, per person. Get the latest cost from the DHA website
      time: 4 // Weeks
    }
  ]
  private getOptions$: Subscription;
  private updateOptions$: Subscription;

  constructor(private store: Store<UnabridgedState>, private processInfoStore: Store<ProcessInformationState>,
    private toastr: ToastrService,
    private readonly effect: UnabridgedStoreEffects) {
    this.form = new FormBuilder().group<UnabridgedOptions>({
      done: false,
      selectedOption: 0
    })
  }

  ngOnInit(): void {
    this.store.dispatch(UnabridgedStoreActions.getOptions())

    this.options$ = this.store.select(UnabridgedStoreSelectors.getOptions);

    this.isMarried$ = this.processInfoStore.select(ProcessInfoSelectors.isMarried);
    this.isMoreThanOne$ = this.processInfoStore.select(ProcessInfoSelectors.isMoreThanOne);
    this.includingChildren$ = this.processInfoStore.select(ProcessInfoSelectors.includingChildren);

    this.getOptions$ = this.store.select(UnabridgedStoreSelectors.getOptions).subscribe((options) => {
      this.form.setValue({
        done: options.done,
        selectedOption: options.selectedOption
      })
    })

    this.updateOptions$ = this.effect.updateOptions$.pipe(
      filter(action => action.type === UnabridgedStoreActions.UnabridgedStoreActions.UpdateOptionsSuccess)
    ).subscribe(() => {
      this.toastr.success(`Updated successfully!`);
    });
  }

  select(index: number) {
    this.form.get('selectedOption')?.setValue(index);
    this.form.markAsDirty();
  }

  save(originalOptions: UnabridgedOptions): void {
    if (this.form.valid) {
      if (this.form.dirty) {
        const options = { ...originalOptions, ...this.form.value };
        this.store.dispatch(UnabridgedStoreActions.updateOptions({ options }));
        this.form.markAsPristine();
      }
    }
  }

  close() {
    this.store.dispatch(timelineActions.clearCurrentEvent());
  }

}
