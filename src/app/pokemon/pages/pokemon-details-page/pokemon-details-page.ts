import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PokemonService } from '../../services/services';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-details-page',
  imports: [CommonModule, RouterModule],
  templateUrl: './pokemon-details-page.html',
  styleUrl: './pokemon-details-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonDetailsPage { 
  private route = inject(ActivatedRoute);
  private service = inject(PokemonService);

  personaje = toSignal(
    this.route.paramMap.pipe(
      map(params => +params.get('id')!),
      switchMap(id => this.service.getCharacterById(id))
    ),
    { initialValue: null }
  );
}
