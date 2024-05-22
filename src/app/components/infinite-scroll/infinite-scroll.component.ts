import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';

import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { Pokemons } from 'src/app/models/api.model';

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: 'infinite-scroll.component.html',
  styleUrls: ['infinite-scroll.component.scss'],
})
export class InfiniteScrollComponent implements OnInit {
  protected pokemons?: Pokemons;
  private limit = 0;
  private offset = 151;

  constructor(private _apiService: ApiService) {}

  ngOnInit() {
    this.generateItems(this.offset, this.limit);
  }

  private generateItems(offset: number, limit: number) {
    // const count = this.items.length + 1;
    // for (let i = 0; i < 50; i++) {
    //   this.items.push(`Item ${count + i}`);
    // }

    this._apiService
      .getAllPokemonsByLimitAndOffset(offset, limit)
      .subscribe((pokemons) => {
        this.pokemons = pokemons;
      });
  }

  onIonInfinite(ev: any) {
    this.offset += this.offset;
    this.generateItems(this.offset, this.limit);
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
}
