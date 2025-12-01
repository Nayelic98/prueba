import { Component, signal, effect } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { PokemonService } from '../../services';

@Component({
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './home-page.html',
})
export class HomePage {

  offset = signal(0);
  limit = 20;

  // solo declaras, NO inicializas aquí
  pokemons: any;

  constructor(
    private pokemonService: PokemonService,
    private router: Router
  ) {

    // ✔ ahora sí puedes usar pokemonService
    this.pokemons = this.pokemonService.list(this.offset(), this.limit);

    effect(() => {
      this.pokemons = this.pokemonService.list(
        this.offset(),
        this.limit
      );
    });
  }

  nextPage() {
    this.offset.update(v => v + 20);
  }

  prevPage() {
    if (this.offset() > 0) {
      this.offset.update(v => v - 20);
    }
  }

  goDetail(url: string) {
    const id = url.split('/').at(-2)!;
    this.router.navigate(['/pokemon', id]);
  }
}