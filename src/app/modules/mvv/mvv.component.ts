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

  constructor(private readonly toastr: ToastrService,
    private readonly fb: FormBuilder,
    private readonly store: Store<MvvState>) {
    this.initializeForm();
  }

  onSave(config: MvvState) {
    if (this.form.dirty) {
      this.store.dispatch(MvvActions.update({ ...this.form.value, ...config }));
    }
  }

  private initializeForm() {
    this.form = this.fb.group<MvvState>({
      ...initialState
    });
  }
}
