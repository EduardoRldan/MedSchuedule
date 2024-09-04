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
    path: 'calendario',
    loadChildren: () => import('./pages/calendario/calendario.module').then( m => m.CalendarioPageModule)
  },
  {
    path: 'pagina-busqueda',
    loadChildren: () => import('./pages/pagina-busqueda/pagina-busqueda.module').then( m => m.PaginaBusquedaPageModule)
  },
  {
    path: 'main-page',
    loadChildren: () => import('./pages/main-page/main-page.module').then( m => m.MainPagePageModule)
  },  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'schedule-hours',
    loadChildren: () => import('./pages/schedule-hours/schedule-hours.module').then( m => m.ScheduleHoursPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'main-page-medic',
    loadChildren: () => import('./pages/main-page-medic/main-page-medic.module').then( m => m.MainPageMedicPageModule)
  },
  {
    path: 'medic-hours',
    loadChildren: () => import('./pages/medic-hours/medic-hours.module').then( m => m.MedicHoursPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
