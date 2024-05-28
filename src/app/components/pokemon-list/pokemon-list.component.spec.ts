import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { of } from 'rxjs';
import { PokemonListComponent } from './pokemon-list.component';
import { Pokemon } from 'src/app/models/api.model';

describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;
  let navControllerMock: any;
  let activatedRouteMock: any;
  let routerMock: any;
  let dbServiceMock: any;

  beforeEach(async () => {
    navControllerMock = {
      navigateForward: jasmine.createSpy('navigateForward'),
    };

    activatedRouteMock = {
      paramMap: of({
        forEach: jasmine.createSpy('forEach'),
      }),
    };

    routerMock = {
      url: '/favorites',
    };

    dbServiceMock = {
      getByID: jasmine.createSpy('getByID').and.returnValue(of(null)),
      deleteByKey: jasmine.createSpy('deleteByKey').and.returnValue(of(null)),
      add: jasmine.createSpy('add').and.returnValue(of(null)),
    };

    await TestBed.configureTestingModule({
      declarations: [PokemonListComponent],
      providers: [
        { provide: NavController, useValue: navControllerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: Router, useValue: routerMock },
        { provide: NgxIndexedDBService, useValue: dbServiceMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;
    component.setFavoriteEvent = new EventEmitter();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load pokemons on init', () => {
    spyOn(component, 'loadPokemons');
    component.ngOnInit();
    expect(component.loadPokemons).toHaveBeenCalled();
  });

  it('should handle changes in input data', () => {
    spyOn(component, 'loadPokemons');
    const changes: any = {
      data: {
        currentValue: [{ id: 1, name: 'Pikachu' }],
        previousValue: [],
      },
    };
    component.ngOnChanges(changes);
    expect(component.loadPokemons).toHaveBeenCalledWith(
      changes.data.currentValue
    );
  });

  it('should emit generateItemsEvent on generateItems call', () => {
    spyOn(component.generateItemsEvent, 'emit');
    component.generateItems('load');
    expect(component.generateItemsEvent.emit).toHaveBeenCalledWith('load');
  });

  it('should add and remove favorite pokemon', () => {
    const mockPokemon: any = {
      id: 1,
      name: 'Pikachu',
      types: [],
      abilities: [],
      stats: [],
      moves: [],
      sprites: { front_default: '' },
      weight: 0,
      height: 0,
    };
    component.favoritePokemon(mockPokemon);
    expect(dbServiceMock.getByID).toHaveBeenCalledWith(
      'favorites',
      mockPokemon.id
    );
    component.setFavoriteEvent.subscribe((event) => {
      if (event.type === 'added') {
        expect(component.favorite[mockPokemon.id]).toBeTrue();
      }
      if (event.type === 'deleted') {
        expect(component.favorite[mockPokemon.id]).toBeFalse();
      }
    });
  });

  it('should navigate to pokemon page', () => {
    const pokemonName = 'Pikachu';
    component.goToPokemonPage(pokemonName);
    expect(navControllerMock.navigateForward).toHaveBeenCalledWith(
      `folder/pokemon/${pokemonName}`
    );
  });

  it('should handle getFavoritePokemon correctly', () => {
    const mockPokemon: any = {
      id: 1,
      name: 'Pikachu',
      types: [],
      abilities: [],
      stats: [],
      moves: [],
      sprites: { front_default: '' },
      weight: 0,
      height: 0,
    };
    dbServiceMock.getByID.and.returnValue(of(mockPokemon));
    component.getFavoritePokemon(mockPokemon);
    expect(dbServiceMock.getByID).toHaveBeenCalledWith(
      'favorites',
      mockPokemon.id
    );
    expect(component.favorite[mockPokemon.id]).toBeTrue();
  });
});
