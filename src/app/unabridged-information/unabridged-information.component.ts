import { Component } from "@angular/core";
import { getMarkAsDone, getSelectedOption, UnabridgedState } from "./state/unabridged.reducer";
import { Store } from "@ngrx/store";
import * as UnabridgedActions from './state/unabridged.actions';

@Component({
  selector: 'app-unabridged-information',
  templateUrl: './unabridged-information.component.html'
})
export class UnabridgedInformationComponent {

  public done: boolean = true;
  public selectedOption?: number;

  options = [
    {
      title: 'I am doing this myself',
      description: 'You can organize this yourself, but we all know the pains of dealing with the Department of Home affairs. This can slow down your process a bit.',
      selected: false
    },
    {
      title: 'I am using a third party',
      description: 'This is a bit more costly, but they tend to get your documents issued faster than if you would do it yourself.',
      selected: false
    }
  ]

  constructor(private store: Store<UnabridgedState>) {
    this.store.select(getMarkAsDone).subscribe((markAsDone) => {
      this.done = markAsDone;
    })

    this.store.select(getSelectedOption).subscribe((option) => {
      this.selectedOption = option;
    })
  }

  markAsDone(value: boolean) {
    this.store.dispatch(UnabridgedActions.setMarkAsDone({ markAsDone: value }));
  }

  select(index: number) {
    this.store.dispatch(UnabridgedActions.setSelectedOption({ selectedOption: index }));
  }
}
