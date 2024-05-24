import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from 'src/app/models/api.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage implements OnInit {
  public folder!: string;

  private readonly initialLimit = 0;
  private readonly initialOffset = 50;

  public limit = this.initialLimit;
  public offset = this.initialOffset;

  pokemons: Pokemon[] = [];
  loading = false;

  private listPokemonEnded = false;

  constructor(private _apiService: ApiService) {}

  ngOnInit() {
    this.loading = true;
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
          this.pokemons = result.pokemons;
        },
        () => {},
        () => {
          this.loading = false;
        }
      );
    } else {
      this.loading = false;
    }
  }
}
