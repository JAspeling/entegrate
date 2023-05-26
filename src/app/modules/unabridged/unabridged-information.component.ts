import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { FormBuilder, FormGroup } from "@angular/forms";
import { UnabridgedConfig } from "./models/unabridged-options.interface";
import { combineLatest, filter, map, Observable, Subscription, tap } from "rxjs";
import * as timelineActions from "../timeline/state/timeline.actions";
import { ToastrService } from "ngx-toastr";
import { UnabridgedState } from "./store/unabridged-store.state";
import { UnabridgedStoreEffects } from "./store/unabridged-store.effects";
import { UnabridgedStoreActions, UnabridgedStoreSelectors } from "./store";
import { AutoUnsubscribe } from "../../shared/decorators/auto-unsubscribe";
import { ProcessInformationState } from "../process-information/store/process-info-store.state";
import { ProcessInfoSelectors } from "../process-information/store";

@Component({
  selector: 'app-unabridged-information',
  templateUrl: './unabridged-information.component.html'
})
@AutoUnsubscribe()
export class UnabridgedInformationComponent implements OnInit {
  public selectedOption?: number;
  config$: Observable<UnabridgedConfig>
  form: FormGroup;

  isMarried$: Observable<boolean>;
  isMoreThanOne$: Observable<boolean>;
  includingChildren$: Observable<boolean>;
  applicationAmount$: Observable<number>;
  applicationCost$: Observable<number>;
  applicationTotalCost$: Observable<number>;

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
      // This is per person, and includes unabridged birth and marriage certificates
      cost: 2500, // Rands, per person. Get the latest cost from the DHA website
      time: 4 // Weeks
    }
  ]
  private getOptions$: Subscription;
  private updateOptions$: Subscription;

  constructor(private store: Store<UnabridgedState>, private processInfoStore: Store<ProcessInformationState>,
    private toastr: ToastrService,
    private readonly effect: UnabridgedStoreEffects) {
    this.form = new FormBuilder().group<UnabridgedConfig>({
      done: false,
      selectedOption: 0,
      cost: 0,
      time: 0
    })
  }

  ngOnInit(): void {
    this.config$ = this.store.select(UnabridgedStoreSelectors.getConfig)
      .pipe(
        tap((config) => {
          this.form.patchValue({
            done: config.done,
            selectedOption: config.selectedOption,
            time: config.time,
            cost: config.cost
          })
        })
      );

    this.isMarried$ = this.processInfoStore.select(ProcessInfoSelectors.isMarried);
    this.isMoreThanOne$ = this.processInfoStore.select(ProcessInfoSelectors.isMoreThanOne);
    this.includingChildren$ = this.processInfoStore.select(ProcessInfoSelectors.includingChildren);
    this.applicationAmount$ = this.processInfoStore.select(ProcessInfoSelectors.applicationAmount);
    this.applicationCost$ = this.store.select(UnabridgedStoreSelectors.getCost).pipe(tap((value) => console.log(value)));
    this.applicationTotalCost$ = combineLatest(this.applicationAmount$, this.config$).pipe(
      map((value) => value[0] * value[1].cost)
    );

    this.updateOptions$ = this.effect.updateOptions$.pipe(
      filter(action => action.type === '[Unabridged] Update unabridged options success')
    ).subscribe(() => {
      this.toastr.success(`Updated successfully!`);
    });
  }

  select(index: number) {

    // destructure cost and time from the selection
    const selected: UnabridgedConfig = {
      cost: this.selections[index].cost,
      time: this.selections[index].time,
      selectedOption: index,
      done: this.form.get('done')?.value,
    };

    this.form.patchValue(selected);
    this.form.markAsDirty();

    this.store.dispatch(UnabridgedStoreActions.updateLocalCostTime(selected));
  }

  save(config: UnabridgedConfig): void {
    if (this.form.valid) {
      if (this.form.dirty) {
        const options = { ...config, ...this.form.value };
        this.store.dispatch(UnabridgedStoreActions.updateConfig(options));
        this.form.markAsPristine();
      }
    }
  }

  close() {
    this.store.dispatch(timelineActions.clearCurrentEvent());
  }

}
