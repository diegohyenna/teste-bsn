import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, from, mergeMap } from 'rxjs';
import { Pokemon, Pokemons } from '../models/api.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.apiBaseUrl;
  }

  getAllPokemonsByLimitAndOffset(
    limit: number,
    offset: number
  ): Observable<Pokemon> {
    return this.httpClient
      .get<Pokemons>(`${this.baseUrl}pokemon?limit=${limit}&offset=${offset}`)
      .pipe(mergeMap((pokemons) => from(pokemons.results)))
      .pipe(
        mergeMap(async (pokemon) => {
          let pokemonDetail = (await this.httpClient
            .get<Pokemon>(pokemon.url)
            .toPromise()) as Pokemon;
          return pokemonDetail;
        })
      );
  }

  getPokemonByName(name: string): Observable<Pokemon> {
    return this.httpClient.get<Pokemon>(`pokemon/${name}`);
  }
}
