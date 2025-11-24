import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Drawer } from './components/drawer/drawer';
import { Table } from './components/Table/Table';
import { Card } from './components/card/card';
import { CardResponsive } from './components/card-responsive/card-responsive';
import { Footer } from './components/footer/footer';
import { Avatar } from './components/avatar/avatar';
import { Menu } from './components/menu/menu';

@Component({
  selector: 'app-daisyui-page',
  standalone: true,
  imports: [CommonModule,Drawer,
    Avatar,
    Table,
    Card,
    CardResponsive,
    Footer,Menu,],
  templateUrl: './daisyui-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DaisyuiPage{}