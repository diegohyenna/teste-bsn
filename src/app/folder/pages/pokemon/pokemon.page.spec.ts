import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NavController } from '@ionic/angular';
import { of } from 'rxjs';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { PokemonPage } from './pokemon.page';
import { ApiService } from 'src/app/services/api.service';
import { Pokemon } from 'src/app/models/api.model';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('PokemonPage', () => {
  let component: PokemonPage;
  let fixture: ComponentFixture<PokemonPage>;
  let apiServiceMock: any;
  let dbServiceMock: any;
  let navCtrlMock: any;
  let activatedRouteMock: any;

  beforeEach(waitForAsync(() => {
    apiServiceMock = jasmine.createSpyObj('ApiService', ['getPokemonByName']);
    dbServiceMock = jasmine.createSpyObj('NgxIndexedDBService', [
      'getByID',
      'add',
      'deleteByKey',
    ]);
    navCtrlMock = jasmine.createSpyObj('NavController', [
      'navigateForward',
      'back',
    ]);
    activatedRouteMock = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue('pikachu'),
        },
      },
    };

    TestBed.configureTestingModule({
      declarations: [PokemonPage],
      providers: [
        { provide: ApiService, useValue: apiServiceMock },
        { provide: NgxIndexedDBService, useValue: dbServiceMock },
        { provide: NavController, useValue: navCtrlMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterModule.forRoot([])],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonPage);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture).toBeTruthy();
  });

  it('should navigate to favorite page', () => {
    const fixture = TestBed.createComponent(PokemonPage);
    component = fixture.componentInstance;
    component.goToFavoritePage();
    expect(navCtrlMock.navigateForward).toHaveBeenCalledWith('folder/favorite');
  });

  it('should go back', () => {
    component.goBack();
    expect(navCtrlMock.back).toHaveBeenCalled();
  });

  it('should load pokemon details on init', waitForAsync(() => {
    const mockPokemon: any = {
      id: 1,
      name: 'pikachu',
      weight: 60,
      height: 4,
      types: [{ type: { name: 'electric', url: '' }, slot: 0 }],
    };

    dbServiceMock.getByID.and.returnValue(
      of({ pokemonName: 'pikachu', pokemonId: 25 })
    );
    apiServiceMock.getPokemonByName.and.returnValue(of(mockPokemon));

    component.ngOnInit();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.loading).toBeFalse();
      expect(component.pokemonName).toBe('pikachu');
      expect(component.pokemonDetails).toEqual(mockPokemon);
      expect(component.pokemonType).toBe('electric');
    });
  }));

  it('should add and remove favorite pokemon', () => {
    const mockPokemon: Partial<Pokemon> = {
      id: 25,
      name: 'pikachu',
      weight: 60,
      height: 4,
      types: [{ type: { name: 'electric', url: '' }, slot: 0 }],
    };

    const pokemonFavorite = { pokemonName: 'pikachu', pokemonId: 25 };

    dbServiceMock.getByID.and.returnValue(of(null));
    dbServiceMock.add.and.returnValue(of(pokemonFavorite));
    apiServiceMock.getPokemonByName.and.returnValue(of(mockPokemon));

    component.ngOnInit();

    component.favoritePokemon(mockPokemon as any);
    expect(dbServiceMock.getByID).toHaveBeenCalledWith(
      'favorites',
      mockPokemon.id
    );

    expect(component.favorite[pokemonFavorite.pokemonId]).toEqual(true);

    dbServiceMock.getByID.and.returnValue(of(pokemonFavorite));
    dbServiceMock.deleteByKey.and.returnValue(of(true));
    component.favoritePokemon(mockPokemon as any);
    expect(dbServiceMock.deleteByKey).toHaveBeenCalledWith(
      'favorites',
      mockPokemon.id
    );

    expect(component.favorite[pokemonFavorite.pokemonId]).toEqual(false);
  });

  it('should calculate weight correctly', () => {
    const weight = component.calculateWeight(60);
    expect(weight).toBe('6kg');
  });

  it('should calculate height correctly', () => {
    const height = component.calculateHeight(4);
    expect(height).toBe('0.4m');
  });
});
