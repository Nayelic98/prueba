import { Routes } from '@angular/router';
import { LoginPage } from './auth/login-page/login-page';

// import { PokemonDetailPage } from './pokemon/pages/home-page/pokemos-detail-page/pokemos-detail-page';
import { HomePage } from './pokemon/pages/home-page/home-page';
import { PokemonCharacterDetail } from './pokemon/pages/home-page/interface/pokemos-detail-page';
import { PokemonDetailsPage } from './pokemon/pages/pokemon-details-page/pokemon-details-page';

export const routes: Routes = [
  { path: '', component: LoginPage },
{ path: 'home', component: HomePage },
{ path: 'pokemon/:id', component: PokemonDetailsPage },
  { path: '**', redirectTo: '' }

];
