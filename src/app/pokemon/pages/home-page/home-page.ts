import { Component, signal, effect, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PokemonService } from '../../services/services';
import { PaginationService } from '../../services/pagination-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, switchMap } from 'rxjs';
import { PaginationComponent } from '../../../shared/pagination/pagination';

@Component({
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home-page.html',
})
export class HomePage {

  private pokemonService = inject(PokemonService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // Lee pagina actual o usa 1
  activePage = signal(Number(localStorage.getItem('page') || 1));

  totalPages = signal(0);

  pokemonResource = toSignal(
    this.route.queryParamMap.pipe(
      map(params => Number(params.get('page')) || this.activePage()),
      switchMap(page => this.pokemonService.getCharacters(page))
    ),
    { initialValue: null }
  );

  constructor() {
    // 1️⃣ Validar sesión
    const savedUser = localStorage.getItem('user');
    if (!savedUser) {
      this.router.navigate(['/']);
      return;
    }

    // 2️⃣ Efecto para guardar estado y evitar romper GitHub Pages
    effect(() => {
      const data = this.pokemonResource();
      if (!data) return;

      this.totalPages.set(Math.ceil((data.count ?? 0) / 20));

      // Guarda la página actual
      localStorage.setItem('page', this.activePage().toString());

      // Actualiza URL para evitar error 404 al recargar en GitHub Pages
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { page: this.activePage() },
        replaceUrl: true
      });
    });
  }

  getPagesList(): number[] {
    return Array.from({ length: this.totalPages() }, (_, i) => i + 1);
  }

  nextPage() {
    if (this.activePage() < this.totalPages()) this.activePage.set(this.activePage() + 1);
  }

  previousPage() {
    if (this.activePage() > 1) this.activePage.set(this.activePage() - 1);
  }

  getIdFromUrl(url: string): number {
    return Number(url.split('/').filter(x => x).pop());
  }
}
