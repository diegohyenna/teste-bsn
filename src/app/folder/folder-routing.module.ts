import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FolderPage } from './folder.page';
import { PokemonPage } from './pages/pokemon/pokemon.page';

const routes: Routes = [
  {
    path: '',
    component: FolderPage,
  },
  {
    path: ':pokemon',
    pathMatch: 'full',
    component: PokemonPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderPageRoutingModule {}
