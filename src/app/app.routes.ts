import { Routes } from '@angular/router';
import { EstilosPage } from './features/estilos-page/estilos-page';
import { SignalBox } from './features/signal-box/signal-box';
import { DaisyuiPage } from './features/daisyui-page/daisyui-page';
import { Drawer } from './features/daisyui-page/components/drawer/drawer';

export const routes: Routes = [
  {
    path: '',
    component: DaisyuiPage
  },
  {
    path: '',
    component: EstilosPage
  },
  {
    path: 'estilos',
    component: EstilosPage
  },
  {
    path:'',
    component: SignalBox
  }

];