import { Directive, ElementRef, HostListener, NgZone } from "@angular/core";
import { ControlValueAccessor } from "@angular/forms";

const TIMEOUT = 150;
@Directive({
  selector: "[appScrollChange]"
})
export class ScrollChangeDirective implements ControlValueAccessor {
  private hoverTimeout: any;

  constructor(private el: ElementRef, private ngZone: NgZone) { }

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
        // Trigger event manually
        this.onChange(newValue);
        // inputElement.dispatchEvent(new Event('input'));

      } else if (inputElement.tagName === 'SELECT') {
        const optionElements = Array.from(inputElement.options);
        const currentIndex = optionElements.findIndex((option: any) => option.selected);
        const newIndex = currentIndex + (event.deltaY > 0 ? 1 : -1);
        if (newIndex >= 0 && newIndex < optionElements.length) {
          inputElement.selectedIndex = newIndex;
          this.ngZone.runOutsideAngular(() => {
            inputElement.dispatchEvent(new Event('input'));
          });
        }
      }
    }
  }

  onChange = (value: any) => {};
  onTouched = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: any): void {
    if (value !== undefined) {
      this.el.nativeElement.value = value;
    }
  }
}
