import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientConfigPage } from './patient-config.page';

const routes: Routes = [
  {
    path: '',
    component: PatientConfigPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientConfigPageRoutingModule {}
