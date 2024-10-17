import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainAdminPagePage } from './main-admin-page.page';

const routes: Routes = [
  {
    path: '',
    component: MainAdminPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainAdminPagePageRoutingModule {}
