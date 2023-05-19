import { Component, OnDestroy, OnInit } from "@angular/core";
import { getUnabridgedOptions, UnabridgedState } from "./state/unabridged.reducer";
import { Store } from "@ngrx/store";
import * as UnabridgedActions from './state/unabridged.actions';
import { FormBuilder, FormGroup } from "@angular/forms";
import { UnabridgedOptions } from "./models/unabridged-options.interface";
import { filter, Observable, Subscription } from "rxjs";
import * as timelineActions from "../timeline/state/timeline.actions";
import { ToastrService } from "ngx-toastr";
import { UnabridgedEffects } from "./state/unabridged.effects";

@Component({
  selector: 'app-unabridged-information',
  templateUrl: './unabridged-information.component.html'
})
export class UnabridgedInformationComponent implements OnInit, OnDestroy {
  public selectedOption?: number;
  options$: Observable<UnabridgedOptions>
  form: FormGroup;

  subscriptions: Subscription[] = [];

  selections = [
    {
      title: 'I am doing this myself',
      description: 'You can organize this yourself, but we all know the pains of dealing with the Department of Home affairs. This can slow down your process a bit.',
      selected: false
    },
    {
      title: 'I am using a third party',
      description: 'This is a bit more costly, but they tend to get your documents issued faster than if you would do it yourself.',
      selected: false
    }
  ]

  constructor(private store: Store<UnabridgedState>,
    private toastr: ToastrService,
    private readonly effect: UnabridgedEffects) {
    this.form = new FormBuilder().group<UnabridgedOptions>({
      done: false,
      selectedOption: 0
    })

    this.store.dispatch(UnabridgedActions.getUnabridgedOptions())

    this.options$ = this.store.select(getUnabridgedOptions);

    this.subscriptions.push(
      this.store.select(getUnabridgedOptions).subscribe((options) => {
        this.form.setValue({
          done: options.done,
          selectedOption: options.selectedOption
        })
      })
    );
  }

  select(index: number) {
    this.form.get('selectedOption')?.setValue(index);
    this.form.markAsDirty();
  }

  save(originalOptions: UnabridgedOptions): void {
    if (this.form.valid) {
      if (this.form.dirty) {
        const options = { ...originalOptions, ...this.form.value };
        this.store.dispatch(UnabridgedActions.updateUnabridgedOptions({ options }));
      }
    }
  }

  close() {
    this.store.dispatch(timelineActions.clearCurrentEvent());
  }

  ngOnDestroy(): void {
    console.warn('Destroying unabridged information component');
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.effect.updateOptions$.pipe(
        filter(action => action.type === '[Unabridged] Update unabridged options success')
      ).subscribe(() => {
        this.toastr.success(`Updated successfully!`);
      })
    )
  }
}
