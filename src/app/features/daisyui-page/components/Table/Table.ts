import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-table',
  imports: [],
  templateUrl: './Table.html',
  styleUrl: './Table.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Table { }
