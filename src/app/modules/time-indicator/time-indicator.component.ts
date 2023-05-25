import { Component, ElementRef, ViewChild } from "@angular/core";

@Component({
  selector: 'app-time-indicator',
  templateUrl: './time-indicator.component.html'
})
export class TimeIndicatorComponent {
  @ViewChild('path') path: ElementRef<HTMLDivElement>;
  @ViewChild('progress') progress: ElementRef<HTMLDivElement>;
  @ViewChild('pacman') pacman: ElementRef<HTMLDivElement>;

  currentProgress = 0;

  get pathWidth(): number {
    return this.path.nativeElement.clientWidth
      - (parseInt(window.getComputedStyle(this.path.nativeElement).getPropertyValue('padding')) * 2)
      - 15 // 15px is the width of the pacman
  }

  move(number: number) {
    // left: calc(30px + 15px - 100%);
    this.pacman.nativeElement.classList.toggle('pause');
    // this.currentProgress += number;

    // Set to a random number between 0 and 100
    this.currentProgress = Math.floor(Math.random() * 100);

    let progress = 0;

    if (this.currentProgress >= 100) {
      // Restart pacman, but we dont want this.
      // Move it to the end instead.
      this.currentProgress = 100;

    }

    progress = this.pathWidth * (this.currentProgress / 100);
    this.pacman.nativeElement.style.left = `calc(20px + ${progress}px)`;
    this.progress.nativeElement.style.left = `calc(20px + ${progress}px - 100%)`;

    setTimeout(() => {
      this.pacman.nativeElement.classList.toggle('pause');
    }, 1000)

  }
}
