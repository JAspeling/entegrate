import { Component } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { initialState, MvvState } from "./store/mvv.state";
import { Store } from "@ngrx/store";
import { MvvSelectors } from "./store";
import { MvvStoreModule } from "./store/mvv-store.module";
import { AdditionalTemplateComponent } from "../../shared/additional-template.component";

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

export class MvvComponent {
  form: FormGroup;
  config$: Observable<MvvState> = this.store.select(MvvSelectors.getConfig);

  constructor(private readonly fb: FormBuilder, private readonly store: Store<MvvState>) {
    this.initializeForm();
  }

  onSave(config: MvvState) {

  }

  private initializeForm() {
    this.form = this.fb.group<MvvState>({
      ...initialState
    });
  }
}
