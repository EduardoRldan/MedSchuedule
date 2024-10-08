import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CitaDetailsPage } from './cita-details.page';

const routes: Routes = [
  {
    path: '',
    component: CitaDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CitaDetailsPageRoutingModule {}
