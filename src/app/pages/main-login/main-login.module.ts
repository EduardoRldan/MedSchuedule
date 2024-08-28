import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainLoginPageRoutingModule } from './main-login-routing.module';

import { MainLoginPage } from './main-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainLoginPageRoutingModule
  ],
  declarations: [MainLoginPage]
})
export class MainLoginPageModule {}
