import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: 'infinite-scroll.component.html',
  styleUrls: ['infinite-scroll.component.scss'],
})
export class InfiniteScrollComponent implements OnChanges {
  ev: any;
  @Input() loading = false;
  @Input() infiniteScrollDisable = false;
  @Output() generateItemsEvent = new EventEmitter<'load' | 'initialize'>();
  @Output() handleRefreshEvent = new EventEmitter<boolean>();

  constructor() {}

  onIonInfinite(ev: InfiniteScrollCustomEvent) {
    this.generateItemsEvent.emit('load');
    this.ev = ev;
  }

  ngOnChanges(changes: any): void {
    if (!changes.loading.currentValue && this.ev) this.ev.target.complete();
  }

  handleRefresh(event: any) {
    this.handleRefreshEvent.emit(true);
    setTimeout(() => {
      this.handleRefreshEvent.emit(false);
      this.generateItemsEvent.emit('initialize');
      event.target.complete();
    }, 2000);
  }
}
