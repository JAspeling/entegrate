import { Component } from "@angular/core";

@Component({
  selector: 'app-unabridged-information',
  templateUrl: './unabridged-information.component.html'
})
export class UnabridgedInformationComponent {
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

  constructor() {

  }

  select(option: any) {
    this.options.forEach((item) => {
      item.selected = false;
    });

    option.selected = true;
  }
}
