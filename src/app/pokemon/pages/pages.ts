import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-pages',
  imports: [],
  template: `<p>pages works!</p>`,
  styleUrl: './pages.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Pages { }
