import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { HomePage } from './home.page';
import { Pokemon } from 'src/app/models/api.model';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let apiServiceMock: any;

  const mockResult: any = {
    offset: 50,
    limit: 50,
    pokemons: [
      { id: 1, name: 'Bulbasaur', weight: 69, height: 7, types: [] },
      { id: 2, name: 'Ivysaur', weight: 130, height: 10, types: [] },
    ],
  };

  beforeEach(waitForAsync(() => {
    apiServiceMock = jasmine.createSpyObj('ApiService', [
      'getAllPokemonsByLimitAndOffset',
    ]);
    TestBed.configureTestingModule({
      declarations: [HomePage],
      providers: [{ provide: ApiService, useValue: apiServiceMock }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    apiServiceMock.getAllPokemonsByLimitAndOffset.and.returnValue(
      of(mockResult)
    );
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.limit).toBe(0);
    expect(component.offset).toBe(50);
    expect(component.pokemons.length).toEqual(0);
    expect(component.loading).toBeFalse();
  });

  it('should call loadPokemons on ngOnInit', () => {
    spyOn(component, 'loadPokemons');
    component.ngOnInit();
    expect(component.loadPokemons).toHaveBeenCalledWith(
      component.offset,
      component.limit
    );
  });

  it('should load pokemons on initialization', () => {
    const mockResult: any = {
      offset: 50,
      limit: 50,
      pokemons: [
        { id: 1, name: 'Bulbasaur', weight: 69, height: 7, types: [] },
        { id: 2, name: 'Ivysaur', weight: 130, height: 10, types: [] },
      ],
    };
    apiServiceMock.getAllPokemonsByLimitAndOffset.and.returnValue(
      of(mockResult)
    );

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.loading).toBeFalse();

    expect(component.pokemons).toEqual(mockResult.pokemons);
    expect(component.limit).toBe(mockResult.limit);
    expect(component.offset).toBe(mockResult.offset);
    expect(component.loading).toBeFalse();
  });

  it('should generate items correctly when type is load', () => {
    spyOn(component, 'loadPokemons');
    component.ngOnInit();
    component.generateItems('load');
    expect(component.loading).toBeTrue();
    expect(component.loadPokemons).toHaveBeenCalledWith(
      component.offset,
      component.limit
    );
  });

  it('should generate items correctly when type is initialize', () => {
    spyOn(component, 'loadPokemons');
    component.ngOnInit();
    component.generateItems('initialize');
    expect(component.loading).toBeTrue();
    expect(component.loadPokemons).toHaveBeenCalledWith(
      component.offset,
      component.limit
    );
  });

  it('should set listPokemonEnded to true when offset and limit are zero', () => {
    const mockResult = {
      offset: 0,
      limit: 0,
      pokemons: [],
    };
    apiServiceMock.getAllPokemonsByLimitAndOffset.and.returnValue(
      of(mockResult)
    );

    component.loadPokemons(0, 0);

    expect(component.listPokemonEnded).toBeTrue();
  });

  it('should not load more pokemons when listPokemonEnded is true', () => {
    component.listPokemonEnded = true;
    component.loadPokemons(0, 0);

    expect(
      apiServiceMock.getAllPokemonsByLimitAndOffset
    ).not.toHaveBeenCalled();
  });
});
