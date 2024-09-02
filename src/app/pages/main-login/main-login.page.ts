import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

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
    name : "Juanito Perez"
  }
  mail : string = "";
  pw : string = "";
  constructor(private router: Router, private toastController : ToastController) { }

  ngOnInit() {
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
      let navExtras : NavigationExtras = {
        state : {
          user : this.dummyUser
        }
      }
      this.router.navigate(['/main-page'], navExtras)
    }
  }
  signup () {
    this.router.navigate(['/signup']);
  }
  forgotPassword(){
    this.router.navigate(['/forgot-password']);
  }
}
