import { Directive, ElementRef, Input, OnChanges, OnInit } from '@angular/core';

@Directive({
  selector: '[appPokemonType]',
})
export class PokemonTypeDirective implements OnInit, OnChanges {
  readonly TYPES: any = {
    normal: '#a4acaf',
    fighting: '#d56723',
    flying: 'linear-gradient(180deg, #53a4cf 50%, #3dc7ef 50%)',
    poison: '#b97fc9',
    ground: 'linear-gradient(180deg, #f7de3f 50%, #ab9842 50%)',
    rock: '#a38c21',
    bug: 'linear-gradient(180deg, #97d74e 50%, #729f3f 50%)',
    ghost: '#7b62a3',
    steel: '#c2d6d7',
    fire: '#fd7d24',
    water: '#4592c4 ',
    grass: '#9bcc50',
    electric: '#eed535',
    psychic: '#f366b9',
    ice: 'linear-gradient(180deg, #eaedee 50%, #51c4e7 50%)',
    dragon: 'linear-gradient(180deg, #53a4cf 50%, #f16e57 50%)',
    dark: '#707070',
    fairy: '#fdb9e9',
  };

  @Input() pokemonType!: string;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.setClass(this.pokemonType);
  }

  setClass(pokemonType: string) {
    this.el?.nativeElement?.setAttribute('style', '');
    this.el?.nativeElement?.setAttribute(
      'style',
      `background: ${this.TYPES[pokemonType]}`
    );

    return;
  }

  ngOnChanges(changes: any): void {
    this.setClass(changes.pokemonType.currentValue);
  }
}
