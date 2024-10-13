import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es-CL';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatientListPageRoutingModule } from './patient-list-routing.module';

import { PatientListPage } from './patient-list.page';
import { ComponentsModule } from 'src/app/components/components.module';
registerLocaleData(localeEs, 'es');
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PatientListPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PatientListPage],
  providers : [{ provide : LOCALE_ID, useValue : 'es'}]
})
export class PatientListPageModule {}
