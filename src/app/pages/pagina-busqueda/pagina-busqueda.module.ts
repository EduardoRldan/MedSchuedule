import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaginaBusquedaPageRoutingModule } from './pagina-busqueda-routing.module';

import { PaginaBusquedaPage } from './pagina-busqueda.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaginaBusquedaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PaginaBusquedaPage]
})
export class PaginaBusquedaPageModule {}
