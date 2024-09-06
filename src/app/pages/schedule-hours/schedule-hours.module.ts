import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScheduleHoursPageRoutingModule } from './schedule-hours-routing.module';

import { ScheduleHoursPage } from './schedule-hours.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScheduleHoursPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ScheduleHoursPage]
})
export class ScheduleHoursPageModule {}
