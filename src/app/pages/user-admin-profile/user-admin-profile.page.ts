import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PasswordAdminForm } from './user-admin-profile-pw.form';
import { User } from 'src/app/classes/user';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ObjectHandlerService } from 'src/app/services/object-handler.service';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { Router } from '@angular/router';
import { AlerttoastService } from 'src/app/services/alerttoast.service';

@Component({
  selector: 'app-user-admin-profile',
  templateUrl: './user-admin-profile.page.html',
  styleUrls: ['./user-admin-profile.page.scss'],
})
export class UserAdminProfilePage implements OnInit {
  userLogged! : User;
  passwordForm! : FormGroup;

  validOldPw : boolean = true;
  validNewPw : boolean = true;
  confirmationValid : boolean = true;

  emailInput : string = "";
  constructor(
    private formBuilder : FormBuilder, 
    private storage : NativeStorage, 
    private handler : ObjectHandlerService,
    private bd : ServicebdService,
    private router : Router,
    private toast : AlerttoastService) { }

  ngOnInit() {
    this.loadData();
  }

  ionViewWillEnter(){
    this.loadData();
  }

  ionViewDidLeave(){
    this.emailInput = "";
  }

  async loadData(){
    this.passwordForm = new PasswordAdminForm(this.formBuilder).createForm()
    await this.storage.getItem('userLogged')
    .then(data => {
      this.userLogged = this.handler.createUserObject(data)
    }).catch(e => console.log('DFO: error al obtener usuario '+JSON.stringify(e)))
  }

  async checkForPw(oldPw : string) : Promise<boolean>{
    // chequea en primer lugar si la contraseña actual es la correcta
    let valid = false;
    await this.bd.checkForPassword(this.userLogged.idUser)
    .then(async () =>{
      await this.storage.getItem('pw'+this.userLogged.idUser)
      .then((data) =>{
        if (data === oldPw){
          valid = true
        }
      })
    })
    return valid;
  }

  async checkForNewPw(newPw : string) : Promise<boolean>{
    // chequea si la nueva contraseña no es igual a la antigua
    console.log('DFO: checkfornewpw '+newPw)
    let valid = false
    await this.storage.getItem('pw'+this.userLogged.idUser)
    .then(data => {
      console.log('DFO: oldpw '+data)
      if(data != newPw){
        valid = true
      }
    })
    return valid;
  }

  checkConfirmationPw(newPw1 : string, newPw2 : string){
    return newPw1 === newPw2
  }

  async changePw(){
    const values = Object.values(this.passwordForm.value)
    let check1 = await this.checkForPw(values[0] as string);
    let check2 = await this.checkForNewPw(values[1] as string);
    let check3 = this.checkConfirmationPw(values[1] as string, values[2] as string);

    console.log('DFO: check1 '+check1+' check2 '+check2)
    if(check1 && check2 && check3){
      await this.bd.updatePw(values[1] as string,this.userLogged.idUser)
      .then(() =>{
        this.logOutSession();
      })
    } else if (!check1){
      this.validOldPw = false
    } else if (!check2){
      this.validNewPw = false
    } else if(!check3){
      this.confirmationValid = false
    }
  }

  checkEmail(){
    return this.emailInput === this.userLogged.email
  }

  async changeEmail(){
    if(this.checkEmail()){
      await this.bd.updateUserEmail(this.emailInput,this.userLogged.idUser)
      .then(() => {
        this.logOutSession()
      })
    } else {
      this.toast.presentToast('El nuevo email no puede ser el actual')
    }
  }

  logOutSession(){
    this.bd.logOut();
    this.router.navigate(['']);
  }

}
