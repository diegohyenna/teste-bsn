import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { InfiniteScrollComponent } from './infinite-scroll/infinite-scroll.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { CommonDirectivesModule } from '../directives/common-directives.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, CommonDirectivesModule],
  declarations: [
    InfiniteScrollComponent,
    HeaderComponent,
    PokemonListComponent,
  ],
  exports: [
    InfiniteScrollComponent,
    HeaderComponent,
    PokemonListComponent,
    FormsModule,
  ],
})
export class CommonComponentsModule {}
