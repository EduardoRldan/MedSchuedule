import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewMedicAccountPageRoutingModule } from './new-medic-account-routing.module';

import { NewMedicAccountPage } from './new-medic-account.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewMedicAccountPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [NewMedicAccountPage]
})
export class NewMedicAccountPageModule {}
