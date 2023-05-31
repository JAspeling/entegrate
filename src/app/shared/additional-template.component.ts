import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AppState } from "../state/app.state";
import { TimelineActions } from "../modules/timeline/state";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-additional',
  template: `
    <div class="content" *ngIf="config">
      <div class="scrollable" (scroll)="onScroll($event)">
        <div class="sticky-top" [class.is-sticky]="isSticky">
          <h4 class="pt-2">{{title}}</h4>
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
        </div>

        <ng-content></ng-content>
      </div>

      <div class="content-footer">
        <button type="button" class="btn btn-secondary" (click)="onClose()">Close</button>
        <button type="button" class="btn btn-primary" (click)="onSave(config)">Save changes</button>
      </div>
    </div>
  `,
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class AdditionalTemplateComponent<T> {
  @Output() save = new EventEmitter<T>();
  @Input() config: T;
  @Input() form: FormGroup;
  @Input() title: string;

  isSticky: boolean = false;

  onScroll(event: any) {
    const scrollableContainer = document.querySelector('.scrollable');
    const scrollTop = scrollableContainer.scrollTop;

    this.isSticky = scrollTop > 0;
  }

  constructor(public store: Store<AppState>) {

  }

  onSave(config: T) {
    this.save.emit(config);
  }

  onClose() {
    this.store.dispatch(TimelineActions.clearCurrentEvent());
  }
}
