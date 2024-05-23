import { ApiService } from './../../services/api.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavController } from '@ionic/angular';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { PokemonPage } from 'src/app/folder/pages/pokemon/pokemon.page';
import { Pokemons } from 'src/app/models/api.model';

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: 'infinite-scroll.component.html',
  styleUrls: ['infinite-scroll.component.scss'],
})
export class InfiniteScrollComponent {
  @Output() generateItemsEvent = new EventEmitter<{
    offset: number;
    limit: number;
  }>();
  @Output() handleRefreshEvent = new EventEmitter<boolean>();

  private readonly initialLimit = 0;
  private readonly initialOffset = 151;

  @Input({ required: true }) limit = this.initialLimit;
  @Input({ required: true }) offset = this.initialOffset;

  constructor() {}

  private generateItems(offset: number, limit: number) {
    this.generateItemsEvent.emit({ limit, offset });
  }

  onIonInfinite(ev: any) {
    this.offset += this.offset;
    setTimeout(() => {
      this.generateItems(this.offset, this.limit);
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 1000);
  }

  handleRefresh(event: any) {
    this.handleRefreshEvent.emit(true);
    setTimeout(() => {
      this.handleRefreshEvent.emit(false);
      this.generateItems(this.initialOffset, this.initialLimit);
      event.target.complete();
    }, 2000);
  }
}
