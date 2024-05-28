import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { ApiService } from 'src/app/services/api.service';
import { FavoritePage } from './favorite.page';
import { Pokemon } from 'src/app/models/api.model';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('FavoritePage', () => {
  let component: FavoritePage;
  let fixture: ComponentFixture<FavoritePage>;
  let dbServiceMock: any;
  let apiServiceMock: any;

  beforeEach(waitForAsync(() => {
    dbServiceMock = jasmine.createSpyObj('NgxIndexedDBService', ['getAll']);
    apiServiceMock = jasmine.createSpyObj('ApiService', ['getPokemonByName']);
    TestBed.configureTestingModule({
      declarations: [FavoritePage],
      providers: [
        { provide: NgxIndexedDBService, useValue: dbServiceMock },
        { provide: ApiService, useValue: apiServiceMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritePage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(fixture).toBeTruthy();
  });

  it('should load pokemons on init', () => {
    spyOn(component, 'loadPokemons');
    component.ngOnInit();
    expect(component.loadPokemons).toHaveBeenCalled();
  });

  it('should call loadPokemons when generateItems is called with "load"', () => {
    spyOn(component, 'loadPokemons');
    component.generateItems('load');
    expect(component.loadPokemons).toHaveBeenCalled();
  });

  it('should call loadPokemons when generateItems is called with "initialize"', () => {
    spyOn(component, 'loadPokemons');
    component.generateItems('initialize');
    expect(component.loadPokemons).toHaveBeenCalled();
  });

  it('should load pokemons from favorites', waitForAsync(() => {
    const mockResult = [
      { pokemonName: 'pikachu' },
      { pokemonName: 'bulbasaur' },
    ];

    const mockPokemon: Partial<Pokemon> = {
      id: 1,
      name: 'pikachu',
      weight: 60,
      height: 4,
      types: [{ type: { name: 'electric', url: '' }, slot: 0 }],
    };

    dbServiceMock.getAll.and.returnValue(of(mockResult));
    apiServiceMock.getPokemonByName.and.returnValue(of(mockPokemon));

    component.loadPokemons();

    expect(component.loading).toBeTrue();
    expect(component.clearData).toBeTrue();

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(dbServiceMock.getAll).toHaveBeenCalledWith('favorites');
      expect(apiServiceMock.getPokemonByName).toHaveBeenCalledWith('pikachu');
      expect(apiServiceMock.getPokemonByName).toHaveBeenCalledWith('bulbasaur');
      expect(component.pokemons.length).toBe(2);
      expect(component.pokemons[0].name).toBe('pikachu');
      expect(component.loading).toBeFalse();
    });
  }));

  it('should handle empty favorites list', waitForAsync(() => {
    dbServiceMock.getAll.and.returnValue(of([]));

    component.loadPokemons();

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.loading).toBeFalse();
      expect(component.pokemons.length).toBe(0);
    });
  }));
});
