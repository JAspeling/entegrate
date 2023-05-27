import { Component } from "@angular/core";
import { GatherDocsState, initialState } from "./store/gather-documents.state";
import { Observable, tap } from "rxjs";
import { Store } from "@ngrx/store";
import { GatherDocsActions, GatherDocsSelectors } from "./store";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ProcessInfoSelectors } from "../process-information/store";

@Component({
  selector: 'app-gather-documents',
  templateUrl: './gather-documents.component.html',
})
export class GatherDocumentsComponent {
  form: FormGroup;

  config$: Observable<GatherDocsState> = this.store.select(GatherDocsSelectors.GetConfig)
    .pipe(
      tap((config) => {
        this.form.patchValue(config)
      })
    );
  isMoreThanOne$: Observable<boolean> = this.store.select(ProcessInfoSelectors.isMoreThanOne);

  constructor(private readonly store: Store<GatherDocsState>, private readonly fb: FormBuilder) {
    this.initializeForm();
  }

  private initializeForm() {
    this.form = this.fb.group<GatherDocsState>({
      ...initialState
    })
  }

  save(config: GatherDocsState) {
    this.store.dispatch(GatherDocsActions.updateConfig({ ...config, ...this.form.value }));
  }
}
