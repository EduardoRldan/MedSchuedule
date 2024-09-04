import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicHoursPageRoutingModule } from './medic-hours-routing.module';

import { MedicHoursPage } from './medic-hours.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicHoursPageRoutingModule
  ],
  declarations: [MedicHoursPage]
})
export class MedicHoursPageModule {}
