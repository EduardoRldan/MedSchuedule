import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es-CL';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainPagePageRoutingModule } from './main-page-routing.module';

import { MainPagePage } from './main-page.page';
import { FooterMenuComponent } from 'src/app/components/footer-menu/footer-menu.component';
import { ComponentsModule } from 'src/app/components/components.module';
registerLocaleData(localeEs, 'es');
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainPagePageRoutingModule,
    ComponentsModule
  ],
  declarations: [
    MainPagePage,
    FooterMenuComponent],
    providers : [{ provide : LOCALE_ID, useValue : 'es'}]
})
export class MainPagePageModule {}
