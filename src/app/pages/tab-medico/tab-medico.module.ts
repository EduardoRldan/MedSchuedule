import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabMedicoPageRoutingModule } from './tab-medico-routing.module';

import { TabMedicoPage } from './tab-medico.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabMedicoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TabMedicoPage]
})
export class TabMedicoPageModule {}
