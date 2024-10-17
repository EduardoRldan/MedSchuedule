import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageDbPage } from './manage-db.page';

const routes: Routes = [
  {
    path: '',
    component: ManageDbPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageDbPageRoutingModule {}
