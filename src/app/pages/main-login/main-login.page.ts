import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginPageForm } from './main-login.page.form';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { User } from 'src/app/classes/user';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlerttoastService } from 'src/app/services/alerttoast.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-main-login',
  templateUrl: './main-login.page.html',
  styleUrls: ['./main-login.page.scss'],
})
export class MainLoginPage implements OnInit{
  devOn : boolean = true;
  mail : string = "";
  pw : string = "";
  loginForm : any;
  thisUser! : User;
  isDbReady: boolean = false;
  isLoginValid : boolean = false;
  private loginReady : BehaviorSubject<boolean> = new BehaviorSubject(false);
  private role : BehaviorSubject<number> = new BehaviorSubject(-1);
  private idus : BehaviorSubject<number> = new BehaviorSubject(0)
  idUserFetched = this.idus.asObservable();
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
            this.idUserFetched.subscribe(i =>{
              this.redirectToPage(n,i);
            })
          }
        })
      }
    })
    this.storage.clear().then(() => {
      this.toast.presentToast('Sesiones limpias')
    })
  }

  ionViewWillEnter(){
    this.storage.clear();
  }
  ionViewDidLeave(){
    this.loginForm.controls['email'].setValue("");
    this.loginForm.controls['password'].setValue("");
  }
  /// cambiar usando los componentes
  signup () {
    this.router.navigate(['/signup']);
  }
  forgotPassword(){
    this.router.navigate(['/forgot-password']);
  }

  async getCount(){
    this.bd.database.executeSql('SELECT * FROM cita_medica;',[])
      .then((res) => {
        for(let i = 0; i<res.rows.length;i++){
          console.log('DFO datos: '+ res.rows.item(i).numrun_paciente +'-'+res.rows.item(i).numrun_medico+'-'+res.rows.item(i).hora_cita)
        }
        
      }).catch(e => console.log('DFO Error: '+JSON.stringify(e)))
  }

  redirectToPage(role : number, idUser : number){
    console.log("DFO: redireccionando con role: "+role)

    switch(role){
      case 1:
        this.bd.getPaciente(idUser).then(() =>{
          this.router.navigate(['/tab-paciente/main-page']);
        })
        break;
      case 2:
        this.bd.getMedic(idUser).then(() =>{
          this.router.navigate(['/tab-medico/main-page-medic']);
        })
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
    await this.bd.getUser(userInput, pwInput)
    .then(() =>{
      this.bd.loginValid$.subscribe(async isReady => {
        this.isLoginValid = isReady;
        if(this.isLoginValid){
          await this.storage.getItem("userLogged").then((data)=> {
            user = data;
            values = Object.values(user);
            let idRole = values[4] as number;
            let idUser = values[0] as number;
            this.role.next(idRole);
            this.idus.next(idUser)
            this.loginReady.next(true);
            this.toast.presentToast('Sesión iniciada correctamente');
          }).catch(e => {
            console.log('DFO: Error al obtener usuario' + JSON.stringify(e))
            this.toast.presentToast('Usuario o contraseña incorrectos')
          })
        }else{
          this.toast.presentToast('Usuario o contraseña incorrectos')
        }
      })
    }).catch(e =>{
      console.log('DFO: getUser error '+JSON.stringify(e))
    })
  }
  
      
  // testing
}
