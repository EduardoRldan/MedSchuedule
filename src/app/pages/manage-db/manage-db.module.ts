import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageDbPageRoutingModule } from './manage-db-routing.module';

import { ManageDbPage } from './manage-db.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageDbPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ManageDbPage]
})
export class ManageDbPageModule {}
