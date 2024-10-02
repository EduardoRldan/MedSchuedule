import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginPageForm } from './main-login.page.form';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { User } from 'src/app/classes/user';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlerttoastService } from 'src/app/services/alerttoast.service';

@Component({
  selector: 'app-main-login',
  templateUrl: './main-login.page.html',
  styleUrls: ['./main-login.page.scss'],
})
export class MainLoginPage implements OnInit {

  mail : string = "";
  pw : string = "";
  loginForm : any;
  thisUser! : User;
  dbReady : boolean = true; // debería ser un observable enviado desde el servicio bd, pero no se como hacerlo aun
  constructor(private router: Router, 
    private formBuilder : FormBuilder, 
    private bd : ServicebdService, 
    private storage : NativeStorage, 
    private toast : AlerttoastService) {}

  ngOnInit() {
    this.loginForm = new LoginPageForm(this.formBuilder).createForm();
    this.bd.createDB();
  }
  /// cambiar usando los componentes
  signup () {
    this.router.navigate(['/signup']);
  }
  forgotPassword(){
    this.router.navigate(['/forgot-password']);
  }
  ///
  async login(userInput : string, pwInput : string){
    let user = {};
    let values = [];
    let validUser : boolean;
    validUser = await this.bd.getUser(userInput, pwInput)
    if (validUser){
      this.storage.getItem("userLogged").then((data)=> {
        user = JSON.parse(data);
        values = Object.values(user);
        // for (let value in values){
        //   console.log(typeof(value))
        // };
        let idUser = values[0] as number;
        let email = values[1] as string;
        let active = values[2] as number;
        let fotoPerfil = values[3] as object;
        let idRole = values[4] as number;
  
        this.thisUser = new User(idUser, email, active, fotoPerfil, idRole);
        this.redirectToPage(idRole);
        this.toast.presentToast('Sesión iniciada correctamente');
      })
    } else {
      this.toast.presentToast('Usuario o contraseña incorrectos')
    }
  }
  
  redirectToPage(role : number){
    switch(role){
      case 1:
        this.router.navigate(['/tab-paciente']);
        break;
      case 2:
        this.router.navigate(['/tab-medico']);
        break;
      case 3:
        this.toast.presentToast('Usted es admin');
        break;
      default:
        this.toast.presentToast('ROLE NO VERIFICADO')
    }
  }
      
  // testing
}
