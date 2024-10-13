import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserMedicProfilePage } from './user-medic-profile.page';

const routes: Routes = [
  {
    path: '',
    component: UserMedicProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserMedicProfilePageRoutingModule {}
