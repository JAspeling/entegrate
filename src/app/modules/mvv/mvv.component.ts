import { Component } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Observable, tap } from "rxjs";
import { initialState, MvvState } from "./store/mvv.state";
import { Store } from "@ngrx/store";
import { MvvActions, MvvSelectors } from "./store";
import { MvvStoreModule } from "./store/mvv-store.module";
import { AdditionalTemplateComponent } from "../../shared/additional-template.component";
import { ToastrService } from "ngx-toastr";
import { MvvEffects } from "./store/mvv.effects";
import { ofType } from "@ngrx/effects";
import { AutoUnsubscribe } from "../../shared/decorators/auto-unsubscribe";

@Component({
  selector: 'mvv-component',
  templateUrl: './mvv.component.html',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,

    MvvStoreModule,
    AdditionalTemplateComponent
  ],
})
@AutoUnsubscribe()
export class MvvComponent {
  form: FormGroup;
  config$: Observable<MvvState> = this.store.select(MvvSelectors.getConfig).pipe(
    tap(config => this.form.patchValue(config))
  );
  updateSuccessful = this.effects.update$.pipe(
    ofType(MvvActions.updateSuccess),
    tap(() => this.toastr.success('MVV config updated'))
  ).subscribe()

  constructor(private readonly toastr: ToastrService,
    private readonly fb: FormBuilder,
    private readonly store: Store<MvvState>,
    private readonly effects: MvvEffects) {
    this.initializeForm();
  }

  onSave(config: MvvState) {
    if (this.form.dirty) {
      this.store.dispatch(MvvActions.update({ ...config, ...this.form.value }));
    }
  }

  private initializeForm() {
    this.form = this.fb.group<MvvState>({
      ...initialState
    });
  }
}
