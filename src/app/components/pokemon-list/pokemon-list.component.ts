import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Pokemon } from 'src/app/models/api.model';

type FavoriteEvent = {
  type: 'added' | 'deleted';
  pokemonId: number;
  url: string;
};

@Component({
  selector: 'app-pokemon-list',
  templateUrl: 'pokemon-list.component.html',
  styleUrls: ['pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnChanges, OnInit {
  @Input() data: Pokemon[] = [];
  @Input() loading = false;
  @Input() clearData = false;
  @Input() infiniteScrollDisable = false;

  @Output() generateItemsEvent = new EventEmitter<'load' | 'initialize'>();
  @Output() setFavoriteEvent = new EventEmitter<FavoriteEvent>();

  pokemons: Pokemon[] = [];
  pokemonsBackup: Pokemon[] = [];
  favorite: any[] = [];

  lastPokemonArrayLength = 0;
  loadedPokemonsCount = 0;
  lastPokemonId = 0;

  constructor(
    private _navController: NavController,
    private _activatedRouter: ActivatedRoute,
    private _router: Router,
    private _dbService: NgxIndexedDBService
  ) {}

  ngOnInit(): void {
    this.setFavoriteEvent.subscribe((result) => {
      if (result.type == 'added') {
        this.favorite[result.pokemonId] = true;
      }
      if (result.type == 'deleted') {
        this.favorite[result.pokemonId] = false;

        if (result.url.includes('favorite'))
          this.pokemons = this.pokemons.filter(
            (poke) => poke.id !== result.pokemonId
          );
      }
    });

    this._activatedRouter.paramMap.forEach(() => {
      this.pokemonsBackup = this.pokemons;
      this.loadPokemons([]);
      this.loadPokemons(this.pokemonsBackup);
    });
  }

  ngOnChanges(changes: any): void {
    if (
      changes?.data &&
      changes?.data?.currentValue?.length != this.lastPokemonArrayLength
    ) {
      this.loadPokemons(changes.data.currentValue);
      this.lastPokemonArrayLength = changes?.data?.currentValue?.length;
    }
  }

  generateItems(type: 'load' | 'initialize') {
    this.generateItemsEvent.emit(type);
  }

  loadPokemons(data: Pokemon[]) {
    this.loading = true;

    if (this.clearData) {
      this.clearPokemons(true);
      this.clearData = false;
    }

    if (data.length === 0) {
      this.pokemons = [];
      this.loading = false;
    }

    data.map((poke) => {
      this.pokemons.push(poke);
      this.lastPokemonId = poke.id;
      this.getFavoritePokemon(poke);
    });

    this.pokemons.forEach((poke) => {
      if (poke.id === this.lastPokemonId) {
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      }
    });
  }

  clearPokemons(clean: boolean) {
    if (clean) {
      this.pokemons = [];
      this.data = [];
      this.lastPokemonArrayLength = 0;
      this.lastPokemonId = 0;
    }
  }

  goToPokemonPage(pokemonName: string) {
    this._navController.navigateForward(`folder/pokemon/${pokemonName}`);
  }

  getFavoritePokemon(pokemon: Pokemon) {
    this._dbService.getByID('favorites', pokemon.id).subscribe((poke) => {
      if (poke) {
        this.favorite[pokemon.id] = true;
      } else {
        this.favorite[pokemon.id] = false;
      }
    });
  }

  favoritePokemon(pokemon: Pokemon) {
    this._dbService.getByID('favorites', pokemon.id).subscribe((poke) => {
      if (poke) {
        this.favorite[pokemon.id] = false;
        this._dbService.deleteByKey('favorites', pokemon.id).subscribe(() => {
          this.setFavoriteEvent.emit({
            type: 'deleted',
            pokemonId: pokemon.id,
            url: this._router.url.toString(),
          });
        });
      } else {
        this.favorite[pokemon.id] = true;
        this._dbService
          .add('favorites', {
            pokemonId: pokemon.id,
            pokemonName: pokemon.name,
          })
          .subscribe(() => {
            this.setFavoriteEvent.emit({
              type: 'added',
              pokemonId: pokemon.id,
              url: this._router.url.toString(),
            });
          });
      }
    });
  }
}
