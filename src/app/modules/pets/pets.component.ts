import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdditionalTemplateComponent } from "../../shared/additional-template.component";
import { initialState, PetsState } from "./store/pets.state";
import { Store } from "@ngrx/store";
import { PetsActions, PetsSelectors } from "./store";
import { FormBuilder, FormGroup, FormsModule } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { PetsEffects } from "./store/pets.effects";
import { PetsStoreModule } from "./store/pets.store.module";
import { tap } from "rxjs";
import { AutoUnsubscribe } from "../../shared/decorators/auto-unsubscribe";
import { DropdownComponent } from "../inputs/dropdown.component";
import { TextComponent } from "../inputs/input.component";

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
    TextComponent
  ]
})
@AutoUnsubscribe()
export class PetsComponent {
  form: FormGroup;
  config$ = this.store.select(PetsSelectors.getConfig).pipe(
    tap(config => this.form.patchValue(config))
  );

  updateSuccess = this.effects.update$.pipe(
    tap(() => this.toastr.success('Updated'))

  ).subscribe();

  constructor(private readonly store: Store<PetsState>,
    private readonly fb: FormBuilder,
    private readonly toastr: ToastrService,
    private readonly effects: PetsEffects) {

    this.initializeForm();
  }

  onSave(config: PetsState) {
    if (this.form.dirty) {
      this.store.dispatch(PetsActions.update({ ...config, ...this.form.value }));
    }
  }

  private initializeForm() {
    this.form = this.fb.group<PetsState>({
      ...initialState
    })
  }
}
