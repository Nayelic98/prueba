import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { PokemonResponseTs } from '../pages/home-page/interface/pokemon-responsive';
import { Observable, catchError, of, tap } from 'rxjs';
import { PokemonCharacterDetail } from '../pages/home-page/interface/pokemos-detail-page';

@Injectable({ providedIn: 'root' })
export class PokemonService {

  private http = inject(HttpClient);
  private readonly API_URL = environment.apiUrl; 

  getCharacters(page: number = 1): Observable<PokemonResponseTs> {
  const limit = 20;
  const offset = (page - 1) * limit; 
  return this.http.get<PokemonResponseTs>(`${this.API_URL}?limit=${limit}&offset=${offset}`);
}


    

  getCharacterById(id: number): Observable<PokemonCharacterDetail | null> {
    return this.http.get<PokemonCharacterDetail>(`${this.API_URL}/${id}`).pipe(

      
      
      tap((data) => console.log('Character data:', data)),
      catchError((error) => {
        console.error('Error fetching character by ID:', error);
        return of(null); 
      })
    );
  }
}
