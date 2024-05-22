import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { PokemonPage } from 'src/app/folder/pages/pokemon/pokemon.page';
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

  component = PokemonPage;

  constructor(
    private _apiService: ApiService,
    private _navController: NavController
  ) {}

  ngOnInit() {
    this.generateItems(this.offset, this.limit);
  }

  private generateItems(offset: number, limit: number) {
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

  goToPokemonPage(pokemonName: string) {
    this._navController.navigateForward(`folder/pokemon/${pokemonName}`);
  }
}
