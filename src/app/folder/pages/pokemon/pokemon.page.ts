import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Pokemon } from 'src/app/models/api.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.page.html',
  styleUrl: './pokemon.page.scss',
})
export class PokemonPage implements OnInit {
  pokemonName?: string | undefined;
  pokemonDetails?: Pokemon;
  pokemonType = '';
  favorite: any = [];
  loading = false;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _navCtrl: NavController,
    private _apiService: ApiService,
    private dbService: NgxIndexedDBService
  ) {}

  goToFavoritePage() {
    this._navCtrl.navigateForward('folder/favorite');
  }

  goBack() {
    this._navCtrl.back();
  }

  calculateWeight(pokemonWeight: number | undefined) {
    return pokemonWeight ? pokemonWeight / 10 + 'kg' : '';
  }

  calculateHeight(pokemonHeight: number | undefined) {
    return pokemonHeight ? pokemonHeight / 10 + 'm' : '';
  }

  ngOnInit() {
    this.loading = true;
    this.pokemonName =
      (this._activatedRoute.snapshot.paramMap.get('pokemon') as string) ||
      undefined;

    if (this.pokemonName != undefined) {
      this._apiService
        .getPokemonByName(this.pokemonName)
        .subscribe((details) => {
          if (details) {
            this.pokemonDetails = details;
            if (details.types && details.types.length > 0) {
              this.pokemonType = details.types[0].type.name;
            }
            setTimeout(() => {
              this.loading = false;
            }, 2000);
          } else {
            setTimeout(() => {
              this.loading = false;
            }, 2000);
          }
        });
    } else {
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    }
  }
}
