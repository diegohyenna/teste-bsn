import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Pokemons } from '../models/api.model';
import { environment } from './../../environments/environment';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  const baseUrl = environment.apiBaseUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getAllPokemonsByLimitAndOffset', () => {
    it('should return an Observable of pokemons with limit and offset', () => {
      const mockResponse: Pokemons = {
        count: 2,
        next: `${baseUrl}pokemon?limit=50&offset=50`,
        previous: null,
        results: [
          { name: 'bulbasaur', url: `${baseUrl}pokemon/1/` },
          { name: 'ivysaur', url: `${baseUrl}pokemon/2/` },
        ],
      };

      const mockPokemon1: any = {
        id: 1,
        name: 'bulbasaur',
        weight: 69,
        height: 7,
        types: [],
      };

      const mockPokemon2: any = {
        id: 2,
        name: 'ivysaur',
        weight: 130,
        height: 10,
        types: [],
      };

      service.getAllPokemonsByLimitAndOffset(50, 0).subscribe((result) => {
        expect(result.limit).toBe(50);
        expect(result.offset).toBe(50);
        expect(result.pokemons.length).toBe(2);
        expect(result.pokemons).toEqual([mockPokemon1, mockPokemon2]);
      });

      const req = httpMock.expectOne(`${baseUrl}pokemon?limit=50&offset=0`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);

      const req1 = httpMock.expectOne(`${baseUrl}pokemon/1/`);
      expect(req1.request.method).toBe('GET');
      req1.flush(mockPokemon1);

      const req2 = httpMock.expectOne(`${baseUrl}pokemon/2/`);
      expect(req2.request.method).toBe('GET');
      req2.flush(mockPokemon2);
    });

    it('should handle error response gracefully', () => {
      service.getAllPokemonsByLimitAndOffset(50, 0).subscribe(
        () => fail('should have failed with 500 status'),
        (error) => {
          expect(error.status).toBe(500);
        }
      );

      const req = httpMock.expectOne(`${baseUrl}pokemon?limit=50&offset=0`);
      req.flush('Something went wrong', {
        status: 500,
        statusText: 'Server Error',
      });
    });
  });

  describe('#getPokemonByName', () => {
    it('should return an Observable<Pokemon>', () => {
      const mockPokemon: any = {
        id: 1,
        name: 'bulbasaur',
        weight: 69,
        height: 7,
        types: [],
      };

      service.getPokemonByName('bulbasaur').subscribe((pokemon) => {
        expect(pokemon).toEqual(mockPokemon);
      });

      const req = httpMock.expectOne(`${baseUrl}pokemon/bulbasaur`);
      expect(req.request.method).toBe('GET');
      req.flush(mockPokemon);
    });

    it('should handle error response gracefully', () => {
      service.getPokemonByName('bulbasaur').subscribe(
        () => fail('should have failed with 404 status'),
        (error) => {
          expect(error.status).toBe(404);
        }
      );

      const req = httpMock.expectOne(`${baseUrl}pokemon/bulbasaur`);
      req.flush('Not found', { status: 404, statusText: 'Not Found' });
    });
  });
});
