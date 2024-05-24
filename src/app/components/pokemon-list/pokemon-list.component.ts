import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Pokemon, Pokemons } from 'src/app/models/api.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: 'pokemon-list.component.html',
  styleUrls: ['pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  private readonly initialLimit = 0;
  private readonly initialOffset = 151;

  public limit = this.initialLimit;
  public offset = this.initialOffset;

  protected pokemons: Pokemon[] = [];

  constructor(
    private _navController: NavController,
    private _apiService: ApiService
  ) {}

  ngOnInit() {
    this.clearPokemons(true);
    this.loadPokemons(this.offset, this.limit);
  }

  generateItems(type: string) {
    if (type == 'load') {
      this.limit = this.offset;
      this.offset += this.offset;
      this.loadPokemons(this.offset, this.limit);
    }

    if (type == 'initialize') {
      this.loadPokemons(this.initialOffset, this.offset);
    }
  }

  loadPokemons(offset: number, limit: number) {
    this._apiService
      .getAllPokemonsByLimitAndOffset(offset, limit)
      .subscribe((pokemons) => {
        this.pokemons.push(pokemons);
      });
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

  favoritePokemon(pokemon: Pokemon, pokemonIndex: number) {
    console.log(pokemon);
  }
}
