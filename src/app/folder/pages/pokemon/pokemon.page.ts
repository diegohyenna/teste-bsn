import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.page.html',
})
export class PokemonPage implements OnInit {
  public pokemonName!: string;
  private activatedRoute = inject(ActivatedRoute);
  constructor() {}

  ngOnInit() {
    this.pokemonName = this.activatedRoute.snapshot.paramMap.get(
      'pokemon'
    ) as string;
  }
}
