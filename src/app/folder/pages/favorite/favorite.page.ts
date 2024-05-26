import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Pokemon } from 'src/app/models/api.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
})
export class FavoritePage implements OnInit, OnChanges {
  pokemons: Pokemon[] = [];
  clearData = false;
  loading = false;

  constructor(
    private _dbIndexed: NgxIndexedDBService,
    private _apiService: ApiService
  ) {}

  ngOnInit() {
    this.loadPokemons();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  generateItems(type: string) {
    if (type == 'load') {
      this.loadPokemons();
    }

    if (type == 'initialize') {
      this.loadPokemons();
    }
  }

  setFavorite(event: any) {
    if (event.type == 'deleted') {
      this.clearData = true;
      this.pokemons = this.pokemons.filter(
        (poke) => poke.id !== event.pokemonId
      );
    }
  }

  loadPokemons() {
    let data: Pokemon[] = [];
    this.pokemons = [];
    this.loading = true;
    this.clearData = true;
    this._dbIndexed.getAll('favorites').subscribe(
      (result) => {
        if (!result.length)
          setTimeout(() => {
            this.loading = false;
          }, 1000);

        result.forEach((pokemon: any) =>
          this._apiService
            .getPokemonByName(pokemon.pokemonName)
            .subscribe((poke) => {
              data.push(poke);
              if (result.length == data.length) {
                this.pokemons = data;
                setTimeout(() => {
                  this.loading = false;
                }, 1000);
              }
            })
        );
      },
      () => {
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      }
    );
  }
}
