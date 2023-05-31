import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";

export interface DropdownOption<T> {
  display: string;
  value: T
}

@Component({
  selector: 'app-dropdown',
  template: `
    <div class="mb-3" [formGroup]="form">
      <label [for]="id" class="form-label">{{label}}</label>
      <select [formControlName]="id" [id]="id" class="form-select">
        <option *ngFor="let opt of options" [ngValue]="opt.value">
          {{opt.display}}
        </option>
      </select>
    </div>
  `,
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class DropdownComponent implements OnChanges {
  @Input() label: string;
  @Input() options: DropdownOption<unknown>[];
  @Input() form: FormGroup;
  @Input() id: string;
  @Input() isBoolean = false;

  ngOnChanges(changes:SimpleChanges) {
    this.handleIsBooleanChange(changes);
  }

  private handleIsBooleanChange(changes: SimpleChanges) {
    if (changes && changes['isBoolean'] && changes['isBoolean'].currentValue) {
      this.options = [
        { value: true, display: 'Yes' },
        { value: false, display: 'No' },
      ]
    }
  }

  ngOnInit() {

  }
}
