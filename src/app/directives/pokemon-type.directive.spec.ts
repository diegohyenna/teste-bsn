import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonTypeDirective } from './pokemon-type.directive';

// Component to test directive with
@Component({
  template: `<div appPokemonType [pokemonType]="type"></div>`,
})
class TestComponent {
  type: string = 'fire';
}

describe('PokemonTypeDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let element: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonTypeDirective, TestComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement.querySelector('div');
  });

  it('should create an instance', () => {
    const directive = new PokemonTypeDirective(new ElementRef(element));
    expect(directive).toBeTruthy();
  });

  it('should set the background color based on the pokemon type', () => {
    component.type = 'fire';
    fixture.detectChanges();
    expect(element.getAttribute('style')).toContain('background: #fd7d24');

    component.type = 'water';
    fixture.detectChanges();
    expect(element.getAttribute('style')).toContain('background: #4592c4');

    component.type = 'grass';
    fixture.detectChanges();
    expect(element.getAttribute('style')).toContain('background: #9bcc50');
  });

  it('should handle linear-gradient background correctly', () => {
    component.type = 'flying';
    fixture.detectChanges();
    expect(element.getAttribute('style')).toContain(
      'background: linear-gradient(180deg, #53a4cf 50%, #3dc7ef 50%)'
    );
  });

  it('should update the background color when pokemon type changes', () => {
    component.type = 'electric';
    fixture.detectChanges();
    expect(element.getAttribute('style')).toContain('background: #eed535');

    component.type = 'psychic';
    fixture.detectChanges();
    expect(element.getAttribute('style')).toContain('background: #f366b9');
  });
});
