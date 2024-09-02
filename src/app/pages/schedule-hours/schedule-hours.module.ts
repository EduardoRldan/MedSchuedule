import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScheduleHoursPageRoutingModule } from './schedule-hours-routing.module';

import { ScheduleHoursPage } from './schedule-hours.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScheduleHoursPageRoutingModule
  ],
  declarations: [ScheduleHoursPage]
})
export class ScheduleHoursPageModule {}
