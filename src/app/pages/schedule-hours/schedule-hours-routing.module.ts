import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScheduleHoursPage } from './schedule-hours.page';

const routes: Routes = [
  {
    path: '',
    component: ScheduleHoursPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScheduleHoursPageRoutingModule {}
