import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CalendarioPage } from './calendario/calendario.p

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'calendario',
    loadChildren: () => import('./calendario/calendario.module').then(m => m.CalendarioPageModule)
  },
  // otras rutas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
