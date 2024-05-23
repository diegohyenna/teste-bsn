import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FolderPage } from './folder.page';
import { PokemonPage } from './pages/pokemon/pokemon.page';
import { FavoritePage } from './pages/favorite/favorite.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'pokemons',
  },
  {
    path: 'pokemons',
    component: FolderPage,
  },
  {
    path: 'pokemon/:pokemon',
    component: PokemonPage,
  },
  {
    path: 'favorite',
    component: FavoritePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderPageRoutingModule {}
