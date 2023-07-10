import { Component, Input } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-checkbox',
  template: `
    <div class="form-check mb-3" [formGroup]="form">
      <input class="form-check-input"
             type="checkbox"
             [id]="id || name"
             [formControlName]="name">
      <label class="form-check-label" [for]="id || name">
        <i>{{label}}</i>
      </label>
    </div>
    `,
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class CheckboxComponent {
  @Input() label: string;
  @Input() form: FormGroup;
  @Input() id: string;
  @Input() name: string;
}
