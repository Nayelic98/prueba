import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { PokemonResponseTs } from '../pages/home-page/interface/pokemon-responsive';
import { Observable, catchError, of, tap } from 'rxjs';
import { PokemonCharacterDetail } from '../pages/home-page/interface/pokemos-detail-page';

@Injectable({ providedIn: 'root' })
export class PokemonService {

  private http = inject(HttpClient);
  private readonly API_URL = environment.apiUrl; // https://pokeapi.co/api/v2/pokemon

  // LISTAR POKÉMON
  getCharacters(page: number = 1): Observable<PokemonResponseTs> {
    const limit = 20;
    const offset = (page - 1) * limit;
    console.log('🔍 getCharacters() ejecutado. Página:', page);
console.log('🔗 URL que se está llamando:', `${this.API_URL}?limit=${limit}&offset=${offset}`);

    return this.http.get<PokemonResponseTs>(
      `${this.API_URL}?limit=${limit}&offset=${offset}`
    ).pipe(

      // 👇 IMPRIME LO QUE LLEGA DESDE LA API
      tap(data => console.log("📌 DATA DESDE API:", data)),

      catchError(err => {
        console.error('❌ Error al obtener personajes:', err);
        return of({
          count: 0,
          next: null,
          prev: null,
          pages: 0,
          results: []
        });
      })
    );
  }

  // DETALLE DE POKÉMON POR ID
  getCharacterById(id: number): Observable<PokemonCharacterDetail | null> {
    return this.http.get<PokemonCharacterDetail>(`${this.API_URL}/${id}`).pipe(

      // 👇 IMPRIME EL DETALLE DEL PERSONAJE
      tap(data => console.log(`📌 DATA DETALLE (${id}):`, data)),

      catchError(err => {
        console.error(`❌ Error al obtener personaje con ID ${id}:`, err);
        return of(null);
      })
    );
  }
}
