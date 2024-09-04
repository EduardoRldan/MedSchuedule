import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainPageMedicPageRoutingModule } from './main-page-medic-routing.module';

import { MainPageMedicPage } from './main-page-medic.page';

import { registerLocaleData } from '@angular/common';

import localeEs from '@angular/common/locales/es-CL';

registerLocaleData(localeEs, 'es');
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainPageMedicPageRoutingModule
  ],
  declarations: [MainPageMedicPage],
  providers : [{ provide : LOCALE_ID, useValue : 'es'}]
})
export class MainPageMedicPageModule {}
