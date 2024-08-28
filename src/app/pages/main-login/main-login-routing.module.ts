import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainLoginPage } from './main-login.page';

const routes: Routes = [
  {
    path: '',
    component: MainLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainLoginPageRoutingModule {}
