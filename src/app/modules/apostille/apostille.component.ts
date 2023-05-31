import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { ApostilleState, initialState } from "./store/apostille.state";
import { ApostilleActions, ApostilleSelectors } from "./store";
import { Observable, Subscription, tap } from "rxjs";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AutoUnsubscribe } from "../../shared/decorators/auto-unsubscribe";
import { ApostilleEffects } from "./store/apostille-effects";
import { ToastrService } from "ngx-toastr";
import { ApostilleStoreModule } from "./store/apostille-store.module";
import { CommonModule } from "@angular/common";
import { AdditionalTemplateComponent } from "../../shared/additional-template.component";

@Component({
  selector: 'app-apostille',
  templateUrl: './apostille.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ApostilleStoreModule,
    AdditionalTemplateComponent,

  ]
})
@AutoUnsubscribe()
export class ApostilleComponent implements OnInit {

  config$: Observable<ApostilleState>;
  updateOptions: Subscription;
  config: Subscription;

  form: FormGroup;

  selections = [
    {
      title: 'I am doing this myself',
      description: 'You can organize this yourself through the Department of Home affairs. This can slow down your process a bit.',
      selected: false,
      cost: "Not sure - find out", // Rands, per person. Get the latest cost from the DHA website
      time: 8 // Weeks
    },
    {
      title: 'I am using a third party',
      description: 'This is a bit more costly, but they tend to get your documents issued faster than if you would do it yourself.',
      selected: false,
      // This is per person, and includes unabridged birth and marriage certificates
      cost: "Not sure - find out", // Rands, per person. Get the latest cost from the DHA website
      time: 4 // Weeks
    }
  ]

  constructor(private readonly store: Store<ApostilleState>,
    private effect: ApostilleEffects,
    private readonly toastr: ToastrService,
    private cdr: ChangeDetectorRef) {
    this.initializeForm();
    this.config$ = this.store.select(ApostilleSelectors.getConfig)
      .pipe(
        tap((config) => {
          this.form.patchValue(config);
        })
      );
  }

  save(config: ApostilleState) {
    this.store.dispatch(ApostilleActions.update({ ...config, ...this.form.value }));
  }

  ngOnInit(): void {
    this.updateOptions = this.effect.update$.subscribe(() => {
      this.toastr.success(`Updated successfully!`);
    });
  }

  select(index: number): void {
    // destructure cost and time from the selection
    const selected = {
      ...this.form.value,
      cost: NaN, //this.selections[index].cost,
      time: this.selections[index].time,
      selectedOption: index,
      done: this.form.get('done')?.value,
    };

    this.form.patchValue(selected);
    this.form.markAsDirty();

    this.store.dispatch(ApostilleActions.updateLocal(selected));
  }

  private initializeForm() {
    this.form = new FormBuilder().group<ApostilleState>({
      ...initialState
    })
  }
}
