import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
  ): Observable<Pokemons> {
    return this.httpClient.get<Pokemons>(
      `${this.baseUrl}pokemon?limit=${limit}&offset=${offset}`
    );
  }

  getPokemonByName(name: string): Observable<Pokemon> {
    return this.httpClient.get<Pokemon>(`pokemon/${name}`);
  }
}
