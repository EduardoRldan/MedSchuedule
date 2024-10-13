import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { Medic } from 'src/app/classes/medic';
import { User } from 'src/app/classes/user';
import { ObjectHandlerService } from 'src/app/services/object-handler.service';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { UpdateMedicForm } from './user-medic-profile.form';
import { Camera, CameraResultType } from '@capacitor/camera';
import { AlerttoastService } from 'src/app/services/alerttoast.service';
import { PasswordMedicForm } from './user-medic-profile-pw.form';

@Component({
  selector: 'app-user-medic-profile',
  templateUrl: './user-medic-profile.page.html',
  styleUrls: ['./user-medic-profile.page.scss'],
})
export class UserMedicProfilePage implements OnInit {
  userLogged! : User;
  medicLogged! : Medic;

  // datos formulario
  updateForm! : FormGroup;
  isEnabledForm : boolean = false;
  pnombre : string = "";
  snombre : string = "";
  apaterno : string = "";
  amaterno : string = "";
  box : string = "";
  tel : number = 0;

  // avatar
  avatar : any = 'assets/img/avatardef.png';
  avatarObj : any;
  avatarChanged : boolean = false;

  // email
  emailInput : string = "";

  // password
  passwordForm! : FormGroup;
  validOldPw : boolean = true;
  validNewPw : boolean = true;
  confirmationValid : boolean = true;

  constructor(private router : Router,
    private bd : ServicebdService,
    private storage : NativeStorage,
    private handler : ObjectHandlerService,
    private formBuilder : FormBuilder,
    private toast : AlerttoastService) { }

  ngOnInit() {
    this.updateForm = new UpdateMedicForm(this.formBuilder).createForm()
    this.passwordForm = new PasswordMedicForm(this.formBuilder).createForm()
    this.loadData()
    if(!this.isEnabledForm){
      this.disableForm();
    }
  }

  ionViewDidLeave(){
    this.isEnabledForm = false;
    this.avatarChanged = false;
  }

  ionViewWillEnter(){
    this.loadData();
    if(!this.isEnabledForm){
      this.disableForm();
    }
  }

  async loadData(){
    await this.storage.getItem('userLogged')
    .then((data) =>{
      this.userLogged = this.handler.createUserObject(data);
      this.storage.getItem('medicLogged')
      .then((data)=>{
        console.log('DFO: Medico encontrado')
        this.medicLogged = this.handler.createMedicObject(JSON.parse(data))
        this.fillForm();
        if (this.userLogged.fotoPerfil != ""){
          console.log('DFO foto_perfil '+this.userLogged.fotoPerfil)
          this.avatarObj = JSON.parse(this.userLogged.fotoPerfil)
          let val = Object.values(this.avatarObj);
          this.avatar = val[3]
        }
      })
    })
  }

  fillForm(){
  this.pnombre= this.medicLogged.pnombreMedico
  this.snombre = this.medicLogged.snombreMedico
  this.apaterno = this.medicLogged.apaternoMedico
  this.amaterno = this.medicLogged.amaternoMedico
  this.box = this.medicLogged.boxMedico
  this.tel = this.medicLogged.telMedico

  this.updateForm.controls['firstName'].setValue(this.pnombre);
  this.updateForm.controls['secondName'].setValue(this.snombre);
  this.updateForm.controls['lastName'].setValue(this.apaterno);
  this.updateForm.controls['secondLastName'].setValue(this.amaterno);
  this.updateForm.controls['phone'].setValue(this.tel);
  this.updateForm.controls['box'].setValue(this.box);
  }

  enableForm(){
    this.isEnabledForm = true;
    this.updateForm.controls['firstName'].enable();
    this.updateForm.controls['secondName'].enable();
    this.updateForm.controls['lastName'].enable();
    this.updateForm.controls['secondLastName'].enable();
    this.updateForm.controls['phone'].enable();
    this.updateForm.controls['box'].enable();
  }

  disableForm(){
    this.updateForm.controls['firstName'].disable();
    this.updateForm.controls['secondName'].disable();
    this.updateForm.controls['lastName'].disable();
    this.updateForm.controls['secondLastName'].disable();
    this.updateForm.controls['phone'].disable();
    this.updateForm.controls['box'].disable();
  }

  async updateUserData(){
    if (this.updateForm.valid){
      const values = Object.values(this.updateForm.value)
      let updateValues = {
        pnombre : values[0] as string,
        snombre : values[1] as string,
        apaterno : values[2] as string,
        amaterno : values[3] as string,
        tel : values[4] as number,
        box : values[5] as string
      }
      let newMedico : Medic = new Medic(
        this.medicLogged.numrunMedico,
        this.medicLogged.dvRunMedico,
        updateValues.pnombre,
        updateValues.snombre,
        updateValues.apaterno,
        updateValues.amaterno,
        updateValues.tel,
        updateValues.box,
        this.medicLogged.tiempoBloque,
        this.medicLogged.idEsp,
        this.medicLogged.idUser
      )
      await this.bd.updateMedicData(newMedico)
      .then(async () =>{
        let dataNew = {
          numrunMedico : newMedico.numrunMedico,
          dvRunMedico : newMedico.dvRunMedico,
          pnombreMedico : newMedico.pnombreMedico,
          snombreMedico : newMedico.snombreMedico,
          apaternoMedico : newMedico.apaternoMedico,
          amaternoMedico : newMedico.amaternoMedico,
          telMedico : newMedico.telMedico,
          boxMedico : newMedico.boxMedico,
          tiempoBloque : newMedico.tiempoBloque,
          idEsp : newMedico.idEsp,
          idUser : this.medicLogged.idUser
        }
        await this.storage.setItem('medicLogged',JSON.stringify(dataNew))
        .then(() =>{
          this.router.navigate(['/tab-medico'])
        })
      })
    }
  }

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });
    this.avatarChanged = true;
    //let idx = Object.keys(image).indexOf('webPath')
    //console.log('Indice de webPath '+idx)
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    this.avatarObj = JSON.stringify(image);
    //console.log('DFO: objeto ruta '+ typeof(image.path))
    this.avatar = image.webPath;
  };

  async submitAvatar(avatar : string){
    await this.bd.updateAvatar(this.userLogged.idUser, avatar)
    .then(async () => {
      let newUserData = {
        idUser : this.userLogged.idUser,
        email : this.userLogged.email,
        active : this.userLogged.active,
        fotoPerfil : this.avatarObj,
        idRole : this.userLogged.idRole
      }
      await this.storage.setItem('userLogged', newUserData)
      .then(() => {
        this.router.navigate(['/tab-medico']);
      })
    })
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

  logOutSession(){
    this.bd.logOut();
    this.router.navigate(['']);
  }
}
