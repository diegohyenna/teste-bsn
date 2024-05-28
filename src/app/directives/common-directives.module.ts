import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PokemonTypeDirective } from './pokemon-type.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [PokemonTypeDirective],
  exports: [PokemonTypeDirective],
})
export class CommonDirectivesModule {}
