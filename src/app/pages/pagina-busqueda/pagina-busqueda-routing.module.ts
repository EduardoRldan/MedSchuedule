import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaBusquedaPage } from './pagina-busqueda.page';

const routes: Routes = [
  {
    path: '',
    component: PaginaBusquedaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaginaBusquedaPageRoutingModule {}
