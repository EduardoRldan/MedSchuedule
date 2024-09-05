import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatientConfigPageRoutingModule } from './patient-config-routing.module';

import { PatientConfigPage } from './patient-config.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PatientConfigPageRoutingModule
  ],
  declarations: [PatientConfigPage]
})
export class PatientConfigPageModule {}
