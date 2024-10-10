import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CitaDetailsPageRoutingModule } from './cita-details-routing.module';

import { CitaDetailsPage } from './cita-details.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CitaDetailsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CitaDetailsPage]
})
export class CitaDetailsPageModule {}
