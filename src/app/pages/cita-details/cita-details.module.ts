import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CitaDetailsPageRoutingModule } from './cita-details-routing.module';

import { CitaDetailsPage } from './cita-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CitaDetailsPageRoutingModule
  ],
  declarations: [CitaDetailsPage]
})
export class CitaDetailsPageModule {}
