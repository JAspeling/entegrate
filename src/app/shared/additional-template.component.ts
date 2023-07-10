import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AppState } from "../state/app.state";
import { TimelineActions } from "../modules/timeline/state";
import { CommonModule } from "@angular/common";
import { CheckboxComponent } from "../modules/inputs/checkbox.component";
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-additional',
  template: `
    <div class="content" *ngIf="config">
      <h4 class="pt-2">{{title}}</h4>
      <hr>
      <app-checkbox [name]="'done'"
                    [form]="form"
                    [id]="'flexCheckDefault'"
                    [label]="'Mark as done!'">
      </app-checkbox>
      <ng-content></ng-content>

      <div class="content-footer pe-2">
        <button type="button" class="btn btn-secondary" (click)="onClose()">Close</button>
        <button type="button" class="btn btn-primary" (click)="onSave(config)">Save changes</button>
      </div>
    </div>
  `,
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CheckboxComponent
  ]
})
export class AdditionalTemplateComponent<T> {
  @Output() save = new EventEmitter<T>();
  @Input() config: T;
  @Input() form: FormGroup;
  @Input() title: string;

  constructor(public store: Store<AppState>, private readonly modalService: BsModalService) {

  }

  onSave(config: T) {
    this.save.emit(config);
  }

  onClose() {
    this.modalService.hide();
    this.store.dispatch(TimelineActions.clearCurrentEvent());
  }
}
