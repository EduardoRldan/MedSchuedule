import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es-CL';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarioPageRoutingModule } from './calendario-routing.module';

import { CalendarioPage } from './calendario.page';
import { ComponentsModule } from 'src/app/components/components.module';
registerLocaleData(localeEs, 'es');
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarioPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CalendarioPage],
  providers : [{ provide : LOCALE_ID, useValue : 'es'}]
})
export class CalendarioPageModule {}
