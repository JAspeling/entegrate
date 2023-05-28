import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AppState } from "../state/app.state";
import { TimelineActions } from "../modules/timeline/state";

@Component({
  selector: 'app-additional',
  template: `
    <div class="content" *ngIf="config">
      <div class="scrollable">
        <h4 class="mt-2">{{title}}</h4>
        <hr>
        <div class="form-check mb-3" [formGroup]="form">
          <input class="form-check-input"
                 type="checkbox"
                 id="flexCheckDefault"
                 [formControlName]="'done'">
          <label class="form-check-label" for="flexCheckDefault">
            <i>Mark as done!</i>
          </label>
        </div>

        <ng-content></ng-content>
      </div>

      <div class="content-footer">
        <button type="button" class="btn btn-secondary" (click)="onClose()">Close</button>
        <button type="button" class="btn btn-primary" (click)="onSave(config)">Save changes</button>
      </div>
    </div>

  `
})
export class AdditionalTemplateComponent<T> {
  @Output() save = new EventEmitter<T>();
  @Input() config: T;
  @Input() form: FormGroup;
  @Input() title: string;

  constructor(public store: Store<AppState>) {

  }

  onSave(config: T) {
    this.save.emit(config);
  }

  onClose() {
    this.store.dispatch(TimelineActions.clearCurrentEvent());
  }
}
