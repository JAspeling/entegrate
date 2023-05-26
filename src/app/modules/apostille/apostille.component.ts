import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { ApostilleState } from "./store/apostille.state";
import { ApostilleActions, ApostilleSelectors } from "./store";
import { Observable, Subscription, tap } from "rxjs";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AutoUnsubscribe } from "../../shared/decorators/auto-unsubscribe";
import { ApostilleEffects } from "./store/apostille-effects";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-apostille',
  templateUrl: './apostille.component.html',
})
@AutoUnsubscribe()
export class ApostilleComponent implements OnInit {

  config$: Observable<ApostilleState>;
  updateOptions: Subscription;
  config: Subscription;

  form: FormGroup;

  constructor(private readonly store: Store<ApostilleState>,
    private effect: ApostilleEffects,
    private readonly toastr: ToastrService) {
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

  private initializeForm() {
    this.form = new FormBuilder().group<ApostilleState>({
      done: false,
      cost: 0,
      time: 4
    })
  }
}
