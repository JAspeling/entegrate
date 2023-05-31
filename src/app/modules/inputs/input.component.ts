import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-text',
  template: `

    <div class="col-12 mb-3" [formGroup]="form">
      <label [for]="id" class="form-label">{{label}}</label>
      <input [formControlName]="id" [id]="id" class="form-control" [type]="type" />
    </div>
  `,
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class TextComponent implements OnChanges {
  @Input() label: string;
  @Input() form: FormGroup;
  @Input() id: string;
  @Input() type: 'text' | 'number' = 'text';

  ngOnChanges(changes:SimpleChanges) {
  }

  ngOnInit() {
  }
}
