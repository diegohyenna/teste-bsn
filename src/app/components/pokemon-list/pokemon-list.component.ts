import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Pokemon, Pokemons } from 'src/app/models/api.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: 'pokemon-list.component.html',
  styleUrls: ['pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  private readonly initialLimit = 0;
  private readonly initialOffset = 50;

  public limit = this.initialLimit;
  public offset = this.initialOffset;

  protected pokemons: Pokemon[] = [];

  private listPokemonEnded = false;
  loading = false;

  favorite: any = [];

  constructor(
    private _navController: NavController,
    private _apiService: ApiService,
    private dbService: NgxIndexedDBService
  ) {}

  ngOnInit() {
    this.clearPokemons(true);
    this.loadPokemons(this.offset, this.limit);
  }

  generateItems(type: string) {
    this.loading = true;
    if (type == 'load') {
      this.limit = this.offset;
      this.offset += this.offset;
      this.loadPokemons(this.offset, this.limit);
    }

    if (type == 'initialize') {
      this.loadPokemons(this.initialOffset, this.initialLimit);
    }
  }

  loadPokemons(offset: number, limit: number) {
    if (!this.listPokemonEnded) {
      this._apiService.getAllPokemonsByLimitAndOffset(offset, limit).subscribe(
        (result) => {
          if (result.offset === 0 && result.limit === 0) {
            this.listPokemonEnded = true;
          }
          this.limit = result.limit;
          this.offset = result.offset;
          result.pokemons.forEach((poke) => {
            this.pokemons.push(poke);
            this.getFavoritePokemon(poke);
          });
        },
        () => {},
        () => {
          setTimeout(() => {
            this.loading = false;
          }, 2000);
        }
      );
    } else {
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    }
  }

  clearPokemons(clean: boolean) {
    if (clean) {
      this.pokemons = [];
      this.limit = this.initialLimit;
      this.offset = this.initialOffset;
    }
  }

  goToPokemonPage(pokemonName: string) {
    this._navController.navigateForward(`folder/pokemon/${pokemonName}`);
  }

  getFavoritePokemon(pokemon: Pokemon) {
    this.dbService.getByID('favorites', pokemon.id).subscribe((poke) => {
      if (poke) {
        this.favorite[pokemon.id] = true;
      } else {
        this.favorite[pokemon.id] = false;
      }
    });
  }

  favoritePokemon(pokemon: Pokemon) {
    this.dbService.getByID('favorites', pokemon.id).subscribe((poke) => {
      if (poke) {
        this.dbService.deleteByKey('favorites', pokemon.id).subscribe((key) => {
          this.favorite[pokemon.id] = false;
          console.log(key);
        });
      } else {
        this.dbService
          .add('favorites', {
            pokemonId: pokemon.id,
            pokemonName: pokemon.name,
          })
          .subscribe((key) => {
            console.log('key: ', key);
            this.favorite[pokemon.id] = true;
          });
      }
    });
  }
}
