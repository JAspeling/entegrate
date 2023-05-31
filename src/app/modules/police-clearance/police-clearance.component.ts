import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { initialState, PoliceClearanceState } from "./store/police-clearance-store.state";
import { Store } from "@ngrx/store";
import { PoliceClearanceActions, PoliceClearanceSelectors } from "./store";
import { Subscription, tap } from "rxjs";
import { PoliceClearanceStoreEffects } from "./store/police-clearance-store.effects";
import { ToastrService } from "ngx-toastr";
import { AutoUnsubscribe } from "../../shared/decorators/auto-unsubscribe";
import { CommonModule } from "@angular/common";
import { PoliceClearanceStoreModule } from "./store/police-clearance-store.module";
import { IPoliceClearanceService, PoliceClearanceService } from "./police-clearance.service";
import { AdditionalTemplateComponent } from "../../shared/additional-template.component";

@Component({
  selector: 'app-police-clearance',
  templateUrl: './police-clearance.component.html',
  standalone: true,
  imports: [
    CommonModule,
    PoliceClearanceStoreModule,
    AdditionalTemplateComponent
  ],
  providers: [
    {
      provide: IPoliceClearanceService,
      useClass: PoliceClearanceService
    }
  ],
})
@AutoUnsubscribe()
export class PoliceClearanceComponent {
  form: FormGroup;

  config$ = this.store.select(PoliceClearanceSelectors.getConfig).pipe(
    tap((config) => {
      this.form.patchValue(config);
    })
  );
  updateEffect: Subscription;


  constructor(private readonly fb: FormBuilder,
    private readonly effect: PoliceClearanceStoreEffects,
    private readonly store: Store<PoliceClearanceState>,
    private readonly toastr: ToastrService) {
    this.initializeForm();

    this.updateEffect = this.effect.$update.subscribe(() => {
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
