import { Routes } from '@angular/router';
import { LoginPage } from './auth/login-page/login-page';

// import { PokemonDetailPage } from './pokemon/pages/home-page/pokemos-detail-page/pokemos-detail-page';
import { HomePage } from './pokemon/pages/home-page/home-page';

export const routes: Routes = [
  { path: '', component: LoginPage },
{ path: 'home', component: HomePage },
//   { path: 'pokemon/:id', component: PokemonDetailPage },
  { path: '**', redirectTo: '' }

];
