import { Injectable } from "@angular/core";
import { componentMap } from "../models/component-map";
import { BsModalService } from 'ngx-bootstrap/modal';
import { TimelineActions } from '../../modules/timeline/state';
import { Store } from '@ngrx/store';
import { TimelineState } from '../../modules/timeline/state/timeline.state';

@Injectable()
export class ComponentLoaderService {
  constructor(private readonly modalService: BsModalService, private readonly store: Store<TimelineState>) {}

  loadComponent(componentName: string, ): void {
    const componentType = componentMap.get(componentName);

    if (componentType) {
      const ref = this.modalService.show(componentType,
        {
          id: componentName,
          class: 'modal-lg'
        }
      );

      ref.onHide.subscribe(() => {
        this.store.dispatch(TimelineActions.clearCurrentEvent());
      })
    } else {
      console.error(`Component '${componentName}' not found in the component map.`);
    }
  }
}
