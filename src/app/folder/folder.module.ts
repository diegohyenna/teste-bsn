import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import { CommonComponentsModule } from '../components/common-components.module';
import { HomePage } from './pages/home/home.page';
import { PokemonPage } from './pages/pokemon/pokemon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule,
    CommonComponentsModule,
  ],
  declarations: [FolderPage, HomePage, PokemonPage],
})
export class FolderPageModule {}
