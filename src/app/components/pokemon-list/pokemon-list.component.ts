import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Pokemons } from 'src/app/models/api.model';
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

  protected pokemons?: Pokemons;

  constructor(
    private _navController: NavController,
    private _apiService: ApiService
  ) {}

  ngOnInit() {
    this.loadPokemons(this.offset, this.limit);
  }

  loadPokemons(offset: number, limit: number) {
    this._apiService
      .getAllPokemonsByLimitAndOffset(offset, limit)
      .subscribe((pokemons) => {
        this.pokemons = pokemons;
      });
  }

  clearPokemons(clean: boolean) {
    if (clean) this.pokemons = undefined;
  }

  goToPokemonPage(pokemonName: string) {
    this._navController.navigateForward(`folder/pokemon/${pokemonName}`);
  }
}
