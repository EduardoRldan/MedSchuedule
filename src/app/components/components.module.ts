import { NgModule } from '@angular/core';
import { BtnRouterComponent } from './btn-router/btn-router.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';


@NgModule({
    declarations : [BtnRouterComponent],
    imports : [
        IonicModule,
        CommonModule],
    exports : [BtnRouterComponent]
})

export class ComponentsModule{}