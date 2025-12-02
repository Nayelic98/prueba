import { Component, signal, effect, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PokemonService } from '../../services/services';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, switchMap } from 'rxjs';
import { PaginationComponent } from '../../../shared/pagination/pagination';

export interface UserSession {
  email: string;
  token: string;
}

@Component({
  standalone: true,
  imports: [RouterLink,PaginationComponent],
  templateUrl: './home-page.html',
})
export class HomePage {

  private pokemonService = inject(PokemonService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // Paginación
  activePage = signal(Number(localStorage.getItem('page') || 1));
totalPages = signal(0);
limit = 20;

pokemonResource = toSignal(
  this.route.queryParamMap.pipe(
    map(params => Number(params.get('page')) || this.activePage()),
    switchMap(page => this.pokemonService.getCharacters(page))
  ),
  { initialValue: null }
);


  user = signal<UserSession | null>(null);

  constructor() {
    // Validar sesión
    const savedUser = localStorage.getItem('user');
    if (!savedUser) {
      this.router.navigate(['/']);
      return;
    }
    this.user.set(JSON.parse(savedUser));

    effect(() => {
      const data = this.pokemonResource();
      if (!data) return;

      this.totalPages.set(Math.ceil((data.count ?? 0) / this.limit));
      localStorage.setItem('page', this.activePage().toString());

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { page: this.activePage() },
        replaceUrl: true
      });
    });

    effect(() => {
      const currentUser = this.user();
      if (currentUser) localStorage.setItem('user', JSON.stringify(currentUser));
    });
  }

  
  

  getIdFromUrl(url: string): number {
    return Number(url.split('/').filter(x => x).pop());
  }
}
