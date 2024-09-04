import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicHoursPage } from './medic-hours.page';

const routes: Routes = [
  {
    path: '',
    component: MedicHoursPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicHoursPageRoutingModule {}
