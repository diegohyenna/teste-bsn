import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { NavController } from '@ionic/angular';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Pokemon } from 'src/app/models/api.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: 'pokemon-list.component.html',
  styleUrls: ['pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnChanges {
  @Input() data: Pokemon[] = [];
  loading = false;

  @Output() generateItemsEvent = new EventEmitter<'load' | 'initialize'>();

  pokemons: Pokemon[] = [];
  pokemonPromisses: any = [];
  lastPokemonArrayLength = 0;
  lastPokemonId = 0;
  imagesLoaded = 0;
  favorite: any = [];

  constructor(
    private _navController: NavController,
    private dbService: NgxIndexedDBService
  ) {
    this.loading = true;
  }

  ngOnChanges(changes: any): void {
    if (
      changes?.data &&
      changes?.data?.currentValue &&
      changes?.data?.currentValue?.length != this.lastPokemonArrayLength
    ) {
      this.loading = true;
      this.pokemonPromisses.push(
        this.data.forEach((poke) => {
          this.lastPokemonId = poke.id;
          this.pokemons.push(poke);
          this.getFavoritePokemon(poke);
        })
      );
      this.lastPokemonArrayLength = changes?.data?.currentValue?.length;
      Promise.all([this.pokemonPromisses]).then(() => {
        this.loading = false;
      });
    }
  }

  generateItems(type: 'load' | 'initialize') {
    this.generateItemsEvent.emit(type);
  }

  clearPokemons(clean: boolean) {
    if (clean) {
      this.pokemons = [];
      this.pokemonPromisses = [];
      this.lastPokemonArrayLength = 0;
      this.lastPokemonId = 0;
      this.imagesLoaded = 0;
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
