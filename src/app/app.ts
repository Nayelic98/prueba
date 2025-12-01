import { Component, signal } from '@angular/core';
import { LoginPage } from './auth/login-page/login-page';
// import { HomePage } from './pokemon/pages/home-page/home-page';
// import { PokemonDetailPage } from './pokemon/pages/home-page/pokemos-detail-page/pokemos-detail-page';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-pokemon-app');
  
}
