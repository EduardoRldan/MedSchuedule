import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalNotifications, ScheduleOptions } from '@capacitor/local-notifications';
import { AlertController } from '@ionic/angular';
import { AlerttoastService } from 'src/app/services/alerttoast.service';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { ForgotPasswordForm } from './forgot-password.form';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  token! : number;
  tokenFromUser! : number;
  tokenSend : boolean = false;
  tokenAproved : boolean = false;
  userEmail! : string;
  forgotPasswordForm! : FormGroup;

  constructor(
    private router : Router, 
    private alertController : AlertController, 
    private bd : ServicebdService, 
    private toast : AlerttoastService,
    private formBuilder : FormBuilder) { 
      this.forgotPasswordForm = new ForgotPasswordForm(this.formBuilder).createForm();
    }

  ngOnInit() {
  }

  ionViewDidLeave(){
    this.tokenSend = false
    this.tokenAproved = false
    this.token = 0;
    this.tokenFromUser = 0;
  }

  async emailExists(){
    await this.bd.checkEmailExists(this.userEmail)
    .then(async (res) => {
      if (res === true){
        await this.notification()
      } else {
        this.toast.presentToast('El correo escrito no está registrado')
      }
    })
  }

  async notification(){
    this.createRandomToken();
    this.tokenSend = true;
    let options : ScheduleOptions ={
      notifications : [
        {
          id:1,
          title : "Recuperar Contraseña",
          body : "Su número de recuperación de contraseña",
          largeBody : "Ingrese el siguiente número: "+this.token
        }
      ]
    }
    try{
      await LocalNotifications.schedule(options)
    } catch(e) {
      console.log('DFO: error al enviar notificacion '+JSON.stringify(e))
    }
  }

  createRandomToken(){
    this.token = Math.floor(Math.random() * (9999 - 1000)) + 1000
  }

  checkToken(){
    if(this.token === this.tokenFromUser){
      this.tokenAproved = true;
    } else {
      this.toast.presentToast('El número introducido no es correcto')
    }
  }

  async changePassword(){
    let values = Object.values(this.forgotPasswordForm.value);
    await this.bd.updatePwWithMail(values[0] as string,this.userEmail)
    .then(() => {
      this.presentAlert();
    })
    
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header : 'Recuperar Contraseña',
      message : 'Su contraseña ha sido cambiada exitosamente. Podrá iniciar sesión con su contraseña actual',
      buttons : [{
        text : "Aceptar",
        role : 'confirm'
      }]
    });
    await alert.present();
    this.router.navigate(['/main-login']);
  }
}
