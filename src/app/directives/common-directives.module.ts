import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonTypeDirective } from './pokemon-type.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [PokemonTypeDirective],
  exports: [PokemonTypeDirective],
})
export class CommonDirectivesModule {}
