import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabPacientePage } from './tab-paciente.page';

const routes: Routes = [
  {
    path: '',
    component: TabPacientePage,
    children : [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'main-page'
      },
      {
        path: 'main-page',
        loadChildren: () => import ('../main-page/main-page.module').then((m) => m.MainPagePageModule),
      },
      {
        path: 'schedule-hours',
        loadChildren: () => import('../schedule-hours/schedule-hours.module').then( m => m.ScheduleHoursPageModule)
      },
      {
        path: 'pagina-busqueda',
        loadChildren: () => import('../pagina-busqueda/pagina-busqueda.module').then( m => m.PaginaBusquedaPageModule)
      },
      {
        path: 'calendario',
        loadChildren: () => import('../calendario/calendario.module').then( m => m.CalendarioPageModule)
      },
      {
        path: 'user-profile',
        loadChildren: () => import('../user-profile/user-profile.module').then( m => m.UserProfilePageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabPacientePageRoutingModule {}
