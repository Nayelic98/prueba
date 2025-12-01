// import { Component, OnInit, signal } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { PokemonService } from '../../../services';

// @Component({
//   selector: 'app-pokemon-detail-page',
//   templateUrl: './pokemos-detail-page.html',
//   standalone: true
// })
// export class PokemonDetailPage implements OnInit {
//   pokemon = signal<any>(null);

//   constructor(private route: ActivatedRoute, private ps: PokemonService, private router: Router) {}

//   ngOnInit() {
//     const id = this.route.snapshot.paramMap.get('id')!;
//     this.ps.getPokemonById(id).subscribe(res => this.pokemon.set(res));
//   }

//   goBack() {
//     this.router.navigate(['/home']);
//   }
// }
