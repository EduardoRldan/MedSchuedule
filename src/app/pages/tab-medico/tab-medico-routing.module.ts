import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabMedicoPage } from './tab-medico.page';

const routes: Routes = [
  {
    path: '',
    component: TabMedicoPage,
    children : [
      {
        path : '',
        pathMatch: 'full',
        redirectTo: 'main-page-medic'
      },
      {
        path : 'main-page-medic',
        loadChildren: () => import('../main-page-medic/main-page-medic.module').then( m => m.MainPageMedicPageModule)
      },
      {
        path: 'medic-hours',
        loadChildren: () => import('../medic-hours/medic-hours.module').then( m => m.MedicHoursPageModule)
      },
      {
        path: 'patient-list',
        loadChildren: () => import('../patient-list/patient-list.module').then( m => m.PatientListPageModule)
      },
      {
        path: 'patient-config',
        loadChildren: () => import('../patient-config/patient-config.module').then( m => m.PatientConfigPageModule)
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
export class TabMedicoPageRoutingModule {}
