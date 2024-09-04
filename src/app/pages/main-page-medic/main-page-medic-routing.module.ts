import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPageMedicPage } from './main-page-medic.page';

const routes: Routes = [
  {
    path: '',
    component: MainPageMedicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageMedicPageRoutingModule {}
