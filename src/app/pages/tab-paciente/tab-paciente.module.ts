import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabPacientePageRoutingModule } from './tab-paciente-routing.module';

import { TabPacientePage } from './tab-paciente.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabPacientePageRoutingModule,
    ComponentsModule
  ],
  declarations: [TabPacientePage]
})
export class TabPacientePageModule {}
