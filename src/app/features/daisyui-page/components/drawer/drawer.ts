import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-drawer',
  imports: [RouterModule],
  templateUrl: './drawer.html',
  styleUrl: './drawer.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Drawer { }
