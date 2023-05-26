import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { initialState, PoliceClearanceState } from "./store/police-clearance-store.state";
import { Store } from "@ngrx/store";
import { PoliceClearanceActions, PoliceClearanceSelectors } from "./store";
import { tap } from "rxjs";
import { PoliceClearanceStoreEffects } from "./store/police-clearance-store.effects";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-police-clearance',
  templateUrl: './police-clearance.component.html',
})
export class PoliceClearanceComponent {
  form: FormGroup;

  config$ = this.store.select(PoliceClearanceSelectors.getConfig).pipe(
    tap((config) => {
      this.form.patchValue(config);
    })
  );


  constructor(private readonly fb: FormBuilder,
    private readonly effect: PoliceClearanceStoreEffects,
    private readonly store: Store<PoliceClearanceState>,
    private readonly toastr: ToastrService) {
    this.initializeForm();

    this.effect.$update.subscribe(() => {
      this.toastr.success(`Updated successfully!`);
    });

  }

  initializeForm() {
    this.form = this.fb.group<PoliceClearanceState>(
      initialState
    );
  }

  save(config: PoliceClearanceState) {
    this.store.dispatch(PoliceClearanceActions.update({
      ...config,
      ...this.form.value
    }));
  }
}
