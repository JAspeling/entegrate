import { Injectable, ViewContainerRef } from "@angular/core";
import { componentMap } from "../models/component-map";

@Injectable()
export class ComponentLoaderService {
  constructor() {}

  loadComponent(componentName: string, containerRef: ViewContainerRef): void {
    const componentType = componentMap.get(componentName);

    if (componentType) {
      containerRef?.clear();

      const componentRef = containerRef.createComponent(componentType);
      // You can perform additional operations on the component reference if needed.
    } else {
      console.error(`Component '${componentName}' not found in the component map.`);
    }
  }
}
