import { Component, EventEmitter, Output } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: 'infinite-scroll.component.html',
  styleUrls: ['infinite-scroll.component.scss'],
})
export class InfiniteScrollComponent {
  @Output() generateItemsEvent = new EventEmitter<'load' | 'initialize'>();
  @Output() handleRefreshEvent = new EventEmitter<boolean>();

  constructor() {}

  onIonInfinite(ev: InfiniteScrollCustomEvent) {
    setTimeout(() => {
      this.generateItemsEvent.emit('load');
      ev.target.complete();
    }, 1000);
  }

  handleRefresh(event: any) {
    console.log('refresh');
    this.handleRefreshEvent.emit(true);
    setTimeout(() => {
      this.handleRefreshEvent.emit(false);
      this.generateItemsEvent.emit('initialize');
      event.target.complete();
    }, 2000);
  }
}
