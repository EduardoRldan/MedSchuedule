import { NgModule } from '@angular/core';
import { BtnRouterComponent } from './btn-router/btn-router.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { BtnBackComponent } from './btn-back/btn-back.component';


@NgModule({
    declarations : [BtnRouterComponent, BtnBackComponent],
    imports : [
        IonicModule,
        CommonModule],
    exports : 
    [
        BtnRouterComponent,
        BtnBackComponent
    ]
})

export class ComponentsModule{}