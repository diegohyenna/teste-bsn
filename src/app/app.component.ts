import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Pokemons', url: '/folder/pokemons', icon: 'bug' },
    { title: 'Favoritos', url: '/folder/favorite', icon: 'star' },
  ];
  constructor() {}
}
