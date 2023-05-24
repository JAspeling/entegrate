import { Directive, ElementRef, HostListener, Renderer2 } from "@angular/core";

const TIMEOUT = 150;
@Directive({
  selector: "[appScrollChange]"
})
export class ScrollChangeDirective {
  private hoverTimeout: any;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.hoverTimeout = setTimeout(() => {
      this.hoverTimeout = null;
    }, TIMEOUT);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    clearTimeout(this.hoverTimeout);
    this.hoverTimeout = null;
  }

  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent) {
    this.handleScroll(event);
  }

  private handleScroll(event: WheelEvent) {
    if (this.hoverTimeout === null) {
      event.preventDefault();

      const inputElement = this.el.nativeElement;
      if (inputElement.tagName === 'INPUT' && inputElement.type === 'number') {
        const currentValue = parseInt(inputElement.value, 10) || 0;
        const newValue = currentValue + (event.deltaY > 0 ? -1 : 1);
        inputElement.value = newValue.toString();
      } else if (inputElement.tagName === 'SELECT') {
        const optionElements = Array.from(inputElement.options);
        const currentIndex = optionElements.findIndex((option: any) => option.selected);
        const newIndex = currentIndex + (event.deltaY > 0 ? 1 : -1);
        if (newIndex >= 0 && newIndex < optionElements.length) {
          inputElement.selectedIndex = newIndex;
        }
      }
    }
  }
}
