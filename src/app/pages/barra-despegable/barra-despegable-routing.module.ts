import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BarraDespegablePage } from './barra-despegable.page';

const routes: Routes = [
  {
    path: '',
    component: BarraDespegablePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BarraDespegablePageRoutingModule {}
