import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatientListPageRoutingModule } from './patient-list-routing.module';

import { PatientListPage } from './patient-list.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PatientListPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PatientListPage]
})
export class PatientListPageModule {}
