import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserMedicProfilePageRoutingModule } from './user-medic-profile-routing.module';

import { UserMedicProfilePage } from './user-medic-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserMedicProfilePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [UserMedicProfilePage]
})
export class UserMedicProfilePageModule {}
