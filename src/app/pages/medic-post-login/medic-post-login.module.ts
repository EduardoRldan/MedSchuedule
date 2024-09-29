import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicPostLoginPageRoutingModule } from './medic-post-login-routing.module';

import { MedicPostLoginPage } from './medic-post-login.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicPostLoginPageRoutingModule,
    ComponentsModule
  ],
  declarations: [MedicPostLoginPage]
})
export class MedicPostLoginPageModule {}
