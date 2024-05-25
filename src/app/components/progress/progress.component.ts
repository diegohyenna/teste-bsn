import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-progress',
  templateUrl: 'progress.component.html',
  styleUrls: ['progress.component.scss'],
})
export class ProgressComponent implements OnInit {
  @Input({ required: true }) value!: number;
  progress = 0;

  constructor() {}

  ngOnInit(): void {
    this.setProgress();
  }

  setProgress() {
    this.value = this.value / 100;
    let timer = setInterval(() => {
      this.progress += 0.05;

      if (this.progress > this.value) {
        clearInterval(timer);
      }
    }, 70);
  }
}
