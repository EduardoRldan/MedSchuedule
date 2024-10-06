import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertController : AlertController, private router : Router) { }

  async alertNavigation(route : string, title : string, msj : string){
    // una simple alerta que tiene solo un botón de Aceptar, sirve como redirección al inicio con un mensaje
    const alert = await this.alertController.create(
      {
        header : title,
        message : msj,
        buttons : ['Aceptar']
      }
    );
    await alert.present();
    this.router.navigate([route])
  }
}
