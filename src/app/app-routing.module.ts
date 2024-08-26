import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'sucursales',
    loadChildren: () => import('./pages/sucursales/sucursales.module').then( m => m.SucursalesPageModule)
  },
  {
    path: 'especialidades',
    loadChildren: () => import('./pages/especialidades/especialidades.module').then( m => m.EspecialidadesPageModule)
  },
  {
    path: 'calendario',
    loadChildren: () => import('./pages/calendario/calendario.module').then( m => m.CalendarioPageModule)
  },
  {
    path: 'barra',
    loadChildren: () => import('./pages/barra/barra.module').then( m => m.BarraPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'pagina-busqueda',
    loadChildren: () => import('./pages/pagina-busqueda/pagina-busqueda.module').then( m => m.PaginaBusquedaPageModule)
  },
  {
    path: 'barra-despegable',
    loadChildren: () => import('./pages/barra-despegable/barra-despegable.module').then( m => m.BarraDespegablePageModule)
  },
  {
    path: 'horario',
    loadChildren: () => import('./pages/horario/horario.module').then( m => m.HorarioPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
