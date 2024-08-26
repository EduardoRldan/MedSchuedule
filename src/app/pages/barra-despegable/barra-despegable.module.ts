import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BarraDespegablePageRoutingModule } from './barra-despegable-routing.module';

import { BarraDespegablePage } from './barra-despegable.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BarraDespegablePageRoutingModule
  ],
  declarations: [BarraDespegablePage]
})
export class BarraDespegablePageModule {}
