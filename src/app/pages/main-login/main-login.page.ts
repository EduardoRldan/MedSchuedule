import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginPageForm } from './main-login.page.form';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { User } from 'src/app/classes/user';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlerttoastService } from 'src/app/services/alerttoast.service';
import { BehaviorSubject } from 'rxjs';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-main-login',
  templateUrl: './main-login.page.html',
  styleUrls: ['./main-login.page.scss'],
})
export class MainLoginPage implements OnInit, OnDestroy {
  devOn : boolean = true;
  mail : string = "";
  pw : string = "";
  loginForm : any;
  thisUser! : User;
  isDbReady: boolean = false;
  private loginReady : BehaviorSubject<boolean> = new BehaviorSubject(false);
  private role : BehaviorSubject<number> = new BehaviorSubject(-1);
  roleFetched = this.role.asObservable();
  isLoggedIn = this.loginReady.asObservable();

  constructor(private router: Router, 
    private formBuilder : FormBuilder, 
    private bd : ServicebdService, 
    private storage : NativeStorage, 
    private toast : AlerttoastService) {
    }

  ngOnInit() {
    this.loginForm = new LoginPageForm(this.formBuilder).createForm();
    this.bd.dbReady$.subscribe(isReady => {
      this.isDbReady = isReady;
      if (isReady){
        this.toast.presentToast('BASE DE DATOS LISTA')
      }
    })
    this.isLoggedIn.subscribe(ready => {
      if(ready){
        this.roleFetched.subscribe(n =>{
          if(n>0){

            this.redirectToPage(n)
          }
        })
      }
    })
  }
  ngOnDestroy() {
  }
  /// cambiar usando los componentes
  signup () {
    this.router.navigate(['/signup']);
  }
  forgotPassword(){
    this.router.navigate(['/forgot-password']);
  }

  async getCount(){
    this.bd.getAllMedics();
  }

  redirectToPage(role : number){
    console.log("DFO: redireccionando con role: "+role)

    switch(role){
      case 1:
        this.router.navigate(['/main-page']);
        break;
      case 2:
        this.router.navigate(['/main-page-medic']);
        break;
      case 3:
        this.toast.presentToast('Usted es admin');
        break;
      default:
        this.toast.presentToast('ROLE NO VERIFICADO')
    }
  }
  ///
  async login(userInput : string, pwInput : string){
    let user = {};
    let values = [];
    //let validUser : boolean;
    if (await this.bd.getUser(userInput, pwInput)){
      await this.storage.getItem("userLogged").then((data)=> {
        user = JSON.parse(data);
        values = Object.values(user);
        let idRole = values[4] as number;
        this.role.next(idRole);
        this.loginReady.next(true);
        this.toast.presentToast('Sesión iniciada correctamente');
      })
    } else {
      this.toast.presentToast('Usuario o contraseña incorrectos')
    }
  }
  
      
  // testing
}
