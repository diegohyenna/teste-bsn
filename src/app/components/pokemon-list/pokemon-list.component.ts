import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { NavController } from '@ionic/angular';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Pokemon } from 'src/app/models/api.model';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: 'pokemon-list.component.html',
  styleUrls: ['pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnChanges {
  @Input() data: Pokemon[] = [];
  @Input() loading = false;

  @Output() generateItemsEvent = new EventEmitter<'load' | 'initialize'>();

  pokemons: Pokemon[] = [];
  favorite: any[] = [];

  lastPokemonArrayLength = 0;
  loadedPokemonsCount = 0;
  lastPokemonId = 0;

  constructor(
    private _navController: NavController,
    private dbService: NgxIndexedDBService
  ) {}

  ngOnChanges(changes: any): void {
    if (
      changes?.data &&
      changes?.data?.currentValue &&
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
      this.lastPokemonArrayLength = 0;
      this.lastPokemonId = 0;
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
