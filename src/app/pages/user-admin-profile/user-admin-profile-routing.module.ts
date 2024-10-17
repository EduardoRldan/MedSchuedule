import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserAdminProfilePage } from './user-admin-profile.page';

const routes: Routes = [
  {
    path: '',
    component: UserAdminProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserAdminProfilePageRoutingModule {}
