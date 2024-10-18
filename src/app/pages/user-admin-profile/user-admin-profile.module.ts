import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserAdminProfilePageRoutingModule } from './user-admin-profile-routing.module';

import { UserAdminProfilePage } from './user-admin-profile.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserAdminProfilePageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [UserAdminProfilePage]
})
export class UserAdminProfilePageModule {}
