import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AppState } from "../state/app.state";
import { TimelineActions } from "../modules/timeline/state";
import { CommonModule } from "@angular/common";
import { CheckboxComponent } from "../modules/inputs/checkbox.component";
import { BsModalService } from 'ngx-bootstrap/modal';
import { distinctUntilChanged, Subscription } from 'rxjs';
import { AutoUnsubscribe } from './decorators/auto-unsubscribe';

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
@AutoUnsubscribe()
export class AdditionalTemplateComponent<T> implements OnInit {
  @Output() save = new EventEmitter<T>();
  @Input() config: T;
  @Input() form: FormGroup;
  @Input() title: string;
  sub: Subscription;

  constructor(public store: Store<AppState>, private readonly modalService: BsModalService) {

  }

  onClose() {
    this.modalService.hide();
    this.store.dispatch(TimelineActions.clearCurrentEvent());
  }

  ngOnInit(): void {
    this.sub = this.form.get('done')?.valueChanges.pipe(distinctUntilChanged()).subscribe((value) => {
      this.save.emit({
        ...this.form.value,
        done: value
      });
    })
  }
}
