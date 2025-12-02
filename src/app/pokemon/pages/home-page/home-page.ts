import { Component, signal, effect, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PokemonService } from '../../services/services';
import { PaginationService } from '../../services/pagination-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, switchMap } from 'rxjs';
import { PaginationComponent } from '../../../shared/pagination/pagination';

@Component({
  standalone: true,
  imports: [RouterLink, PaginationComponent],
  templateUrl: './home-page.html',
})
export class HomePage {

  private pokemonService = inject(PokemonService);
  paginationService = inject(PaginationService);
  private route = inject(ActivatedRoute);

  /** -------------------------------------------------------
   * Convertir URL en ID (✔ lo que necesitabas)
   * ------------------------------------------------------*/
  getIdFromUrl(url: string): number {
    return Number(url.split('/').filter(x => x).pop());
  }

  /** -------------------------------------------------------
   * 1) Recurso reactivo por query param ?page=
   * ------------------------------------------------------*/
  pokemonResource = toSignal(
    this.route.queryParamMap.pipe(
      map(params => Number(params.get('page')) || 1),
      switchMap(page => this.pokemonService.getCharacters(page))
    ),
    { initialValue: null }
  );

  /** Total de Pokémon */
  pokemonCount = signal(0);

  /** Total de páginas */
  totalPages = signal(0);

  constructor() {
    effect(() => {
      const data = this.pokemonResource();

      if (!data) return;

      this.pokemonCount.set(data.count ?? 0);
      const pages = Math.ceil((data.count ?? 0) / 20); 
      this.totalPages.set(pages);

      console.log('PokemonResource changed:', data);
    });
  }
}
