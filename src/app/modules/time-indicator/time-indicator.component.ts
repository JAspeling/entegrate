import { Component, ElementRef, ViewChild } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../../state/app.state";
import { getCurrentTime, getTotalTime } from "../../state/app.selectors";
import { combineLatest, map, Observable, tap } from "rxjs";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-time-indicator',
  templateUrl: './time-indicator.component.html',
  standalone: true,
  imports: [
    CommonModule,
  ]
})
export class TimeIndicatorComponent {
  @ViewChild('path') path: ElementRef<HTMLDivElement>;
  @ViewChild('progress') progress: ElementRef<HTMLDivElement>;
  @ViewChild('pacman') pacman: ElementRef<HTMLDivElement>;

  currentProgress = 0;
  totalTime$: Observable<number>;
  currentTime$: Observable<number>;
  timeRemaining$: Observable<number>;

  constructor(private appStore: Store<AppState>) {
    this.totalTime$ = this.appStore.select(getTotalTime);
    this.currentTime$ = this.appStore.select(getCurrentTime);


    this.timeRemaining$ = combineLatest(this.totalTime$, this.currentTime$)
      .pipe(
        map((value) => ({ totalTime: value[0], currentTime: value[1] })),
        tap((value) => {
          this.move(value.currentTime / value.totalTime * 100);
        }),
        map((value) => value.totalTime - value.currentTime)
      );
  }

  get pathWidth(): number {
    return this.path.nativeElement.clientWidth
      - (parseInt(window.getComputedStyle(this.path.nativeElement).getPropertyValue('padding')) * 2)
      - 15 // 15px is the width of the pacman
  }

  move(currentProgress: number) {
    requestAnimationFrame(() => {
      if (this.pacman?.nativeElement) {
        this.pacman.nativeElement.classList.toggle('pause');
        let progress = 0;

        progress = this.pathWidth * (currentProgress / 100);
        this.pacman.nativeElement.style.left = `calc(20px + ${progress}px)`;
        this.progress.nativeElement.style.left = `calc(30px + ${progress}px - 100%)`;

        setTimeout(() => {
          this.pacman.nativeElement.classList.toggle('pause');
        }, 1000)
      }
    })

  }
}
