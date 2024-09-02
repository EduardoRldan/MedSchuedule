import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  constructor(private router : Router, private alertController : AlertController) { }

  ngOnInit() {
  }

  goBack(){
    this.presentAlert();
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header : 'Recuperar Contraseña',
      message : 'Se ha enviado un mensaje a su correo electrónico. Siga las instrucciones para reestablecer su contraseña.',
      buttons : [{
        text : "Aceptar",
        role : 'confirm'
      }]
    });
    await alert.present();
    this.router.navigate(['/main-login']);
  }
}
