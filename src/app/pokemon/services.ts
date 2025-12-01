import { Injectable, resource } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private http: HttpClient) {}

  list(offset: number = 0, limit: number = 20) {
    return resource({
      loader: async () => {
        return await firstValueFrom(
          this.http.get<any>(
            `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
          )
        );
      },
    });
  }

  detail(id: number | string) {
    return resource({
      loader: async () => {
        return await firstValueFrom(
          this.http.get<any>(
            `https://pokeapi.co/api/v2/pokemon/${id}`
          )
        );
      },
    });
  }
}