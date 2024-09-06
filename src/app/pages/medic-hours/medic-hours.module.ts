import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicHoursPageRoutingModule } from './medic-hours-routing.module';

import { MedicHoursPage } from './medic-hours.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicHoursPageRoutingModule,
    ComponentsModule
  ],
  declarations: [MedicHoursPage]
})
export class MedicHoursPageModule {}
