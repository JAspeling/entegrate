import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdditionalTemplateComponent } from "../../shared/additional-template.component";
import { initialState, PetsState } from "./store/pets.state";
import { Store } from "@ngrx/store";
import { PetsActions, PetsSelectors } from "./store";
import { FormBuilder, FormGroup, FormsModule } from "@angular/forms";
import { PetsStoreModule } from "./store/pets.store.module";
import { distinctUntilChanged, tap } from "rxjs";
import { AutoUnsubscribe } from "../../shared/decorators/auto-unsubscribe";
import { DropdownComponent } from "../inputs/dropdown.component";
import { TextComponent } from "../inputs/input.component";
import { CheckboxComponent } from "../inputs/checkbox.component";

import { isEqual } from 'lodash-es';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  standalone: true,
  imports: [
    CommonModule,
    AdditionalTemplateComponent,
    PetsStoreModule,
    FormsModule,
    DropdownComponent,
    TextComponent,
    CheckboxComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@AutoUnsubscribe()
export class PetsComponent implements OnInit {
  form: FormGroup;
  config$ = this.store.select(PetsSelectors.getConfig).pipe(
    tap(config => this.form.patchValue(config))
  );

  selections = [
    {
      title: 'I am using a third party',
      description: 'This can be really costly, but they ensure all the required processes fall into place for your furry friends.',
      selected: false,
      cost: "Not sure - find out", // Rands, per pet. Get the latest cost from some service provider.
      time: 12 // Weeks
    },
    {
      title: 'I am doing this myself',
      description: 'You can do this yourself, but it requires a lot of admin and time.',
      selected: false,
      cost: "Not sure - find out",
      time: 12 // Weeks
    }
  ]

  constructor(private readonly store: Store<PetsState>,
    private readonly fb: FormBuilder) {

    this.initializeForm();
  }

  onSave(config: PetsState) {
    if (this.form.dirty) {
      this.store.dispatch(PetsActions.update({ ...this.form.value, ...config }));
    }
  }

  select(index: number): void {
    this.form.patchValue({
      ...this.form.value,
      selectedOption: index,
      time: this.selections[index].time,
    });

    this.form.markAsDirty();
  }

  private initializeForm() {
    this.form = this.fb.group<PetsState>({
      ...initialState
    })
  }

  navigate(url: string) {
    window.open(url, '_blank')
  }

  ngOnInit(): void {
    this.form.valueChanges.pipe(
      distinctUntilChanged(this.compareFormValue)
    ).subscribe((value) => {
      // console.log(value);
      this.store.dispatch(PetsActions.update({ ...value }));
    })
  }

  compareFormValue(value: any, value2: any) {
    return isEqual(value, value2);
  }
}
