import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'main-login',
    loadChildren: () => import('./pages/main-login/main-login.module').then( m => m.MainLoginPageModule)
  },
  {
    path: '',
    redirectTo: 'main-login',
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
    path: 'pagina-busqueda',
    loadChildren: () => import('./pages/pagina-busqueda/pagina-busqueda.module').then( m => m.PaginaBusquedaPageModule)
  },
  {
    path: 'barra-despegable',
    loadChildren: () => import('./pages/barra-despegable/barra-despegable.module').then( m => m.BarraDespegablePageModule)
  },  {
    path: 'main-page',
    loadChildren: () => import('./pages/main-page/main-page.module').then( m => m.MainPagePageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
