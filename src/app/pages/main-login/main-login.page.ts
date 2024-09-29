import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LoginPageForm } from './main-login.page.form';

@Component({
  selector: 'app-main-login',
  templateUrl: './main-login.page.html',
  styleUrls: ['./main-login.page.scss'],
})
export class MainLoginPage implements OnInit {
  dummyUser : any = {
    mail : "alguien@correo.com",
    pw : "contraseña",
    run : "11222333-4",
    name : "Juanito Perez",
    role : 2
  }
  mail : string = "";
  pw : string = "";
  loginForm : any;

  constructor(private router: Router, private toastController : ToastController, private formBuilder : FormBuilder) { }

  ngOnInit() {
    this.loginForm = new LoginPageForm(this.formBuilder).createForm();
  }
  async presentToast(){
    const toast = await this.toastController.create({
      message : 'Sesión iniciada correctamente',
      duration : 1500,
      position : 'bottom'
    });
    await toast.present();
  }
  login(userInput : string, pwInput : string){
    if (this.dummyUser.mail === userInput && this.dummyUser.pw === pwInput) {
      this.presentToast();
      let loginRole = this.dummyUser.role;
      let navExtras : NavigationExtras = {
        state : {
          user : this.dummyUser
        }
      }
      if (loginRole == 1){
        this.router.navigate(['/tab-paciente'], navExtras)
      } else {
        this.router.navigate(['/medic-post-login'], navExtras)
      }
      
    }
  }
  signup () {
    this.router.navigate(['/signup']);
  }
  forgotPassword(){
    this.router.navigate(['/forgot-password']);
  }
}
