import { Component, signal, effect, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
  private router = inject(Router);

  // Lee el usuario y la página actual desde localStorage
  activePage = signal(Number(localStorage.getItem('page') || 1));

  totalPages = signal(0);

  // Recurso reactivo de Pokémon
  pokemonResource = toSignal(
    this.route.queryParamMap.pipe(
      map((params) => Number(params.get('page')) || this.activePage()),
      switchMap((page) => this.pokemonService.getCharacters(page))
    ),
    { initialValue: null }
  );

  constructor() {
    // Verificar si hay usuario guardado
    const savedUser = localStorage.getItem('user');
    console.log('Usuario guardado en localStorage:', savedUser);
    if (!savedUser) {
      console.warn('No hay usuario guardado, redirigiendo al login...');
      this.router.navigate(['/']);
      return;
    }

    // Actualiza totalPages y guarda la página en localStorage
    effect(() => {
      const data = this.pokemonResource();
      if (!data) return;

      this.totalPages.set(Math.ceil((data.count ?? 0) / 20));
      localStorage.setItem('page', this.activePage().toString());
    });
  }

  // Genera lista de páginas
  getPagesList(): number[] {
    const pages = this.totalPages();
    return Array.from({ length: pages }, (_, i) => i + 1);
  }

  // Botones siguiente y anterior
  nextPage() {
    if (this.activePage() < this.totalPages()) this.activePage.set(this.activePage() + 1);
  }

  previousPage() {
    if (this.activePage() > 1) this.activePage.set(this.activePage() - 1);
  }

  // Convierte la URL de la API en ID
  getIdFromUrl(url: string): number {
    return Number(url.split('/').filter(x => x).pop());
  }
}
