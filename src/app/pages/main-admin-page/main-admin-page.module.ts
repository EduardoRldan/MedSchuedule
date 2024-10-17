import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainAdminPagePageRoutingModule } from './main-admin-page-routing.module';

import { MainAdminPagePage } from './main-admin-page.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainAdminPagePageRoutingModule,
    ComponentsModule
  ],
  declarations: [MainAdminPagePage]
})
export class MainAdminPagePageModule {}
