import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, from, mergeMap, map, forkJoin, of } from 'rxjs';
import { Pokemon, Pokemons, Result } from '../models/api.model';

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
  ): Observable<{
    limit: number;
    offset: number;
    pokemons: Pokemon[];
  }> {
    return this.httpClient
      .get<Pokemons>(`${this.baseUrl}pokemon?limit=${limit}&offset=${offset}`)
      .pipe(
        mergeMap((pokemons) => {
          let limitAndOffset: any = this.getQueryParams(pokemons.next);
          return forkJoin(
            pokemons.results.map((result) =>
              this.httpClient.get<Pokemon>(result.url)
            )
          ).pipe(
            map((pokemons) => {
              if (limitAndOffset !== false) {
                return {
                  limit: limitAndOffset.limit,
                  offset: limitAndOffset.offset,
                  pokemons,
                };
              }
              return {
                limit: 0,
                offset: 0,
                pokemons: pokemons,
              };
            })
          );
        })
      );
  }

  getPokemonByName(name: string): Observable<Pokemon> {
    return this.httpClient.get<Pokemon>(`pokemon/${name}`);
  }

  private getQueryParams(url: string) {
    if (url) {
      const urlObj = new URL(url);
      const limit = parseInt(urlObj.searchParams.get('limit') || '0');
      const offset = parseInt(urlObj.searchParams.get('offset') || '0');
      return { limit, offset };
    }
    return false;
  }
}
