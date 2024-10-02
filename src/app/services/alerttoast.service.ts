import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlerttoastService {

  constructor(private toastController : ToastController) { }

  async presentToast(msj : string, duration : number = 1500) {
    const toast = await this.toastController.create({
      message: msj,
      duration: duration,
      position: 'bottom',
    });

    await toast.present();
  }
}
