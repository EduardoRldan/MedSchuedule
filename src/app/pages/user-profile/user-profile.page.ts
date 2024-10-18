import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { Paciente } from 'src/app/classes/paciente';
import { User } from 'src/app/classes/user';
import { ObjectHandlerService } from 'src/app/services/object-handler.service';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { UpdateForm } from './user-profile.form';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { BlobConversionService } from 'src/app/services/blob-conversion.service';
import { EncoderService } from 'src/app/services/encoder.service';
import { PasswordForm } from './user-profile-pw-form';
import { AlerttoastService } from 'src/app/services/alerttoast.service';
import { AlertController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  userLogged! : User;
  patientLogged! : Paciente;

  // datos del formulario
  updateForm! : FormGroup;
  pnombre : string = "";
  snombre : string = "";
  apaterno : string = "";
  amaterno : string = "";
  tel : number = 0;
  // habilitador
  isEnabledForm :boolean = false;
  // cambiar contraseña
  passwordForm! : FormGroup;
  oldPw : string = "";
  newPw : string = "";
  confirmNewPw : string = "";
  validOldPw : boolean = true;
  validNewPw : boolean = true;
  confirmationValid : boolean = true;
  // foto
  avatar : any = 'assets/img/avatardef.png';
  avatarPath! : string;
  avatarObj : any;
  avatarChanged : boolean = false;
  // email
  emailInput :string = "";
  constructor(
    private router : Router,
    private bd : ServicebdService,
    private storage : NativeStorage,
    private handler : ObjectHandlerService,
    private formBuilder : FormBuilder,
    private toast : AlerttoastService,
    private alertController : AlertController,
    private alert : AlertService) { }

  ngOnInit() {
    this.updateForm = new UpdateForm(this.formBuilder).createForm()
    this.passwordForm = new PasswordForm(this.formBuilder).createForm()
    this.loadData()
    if(!this.isEnabledForm){
      this.disableForm();
    }
  }

  ionViewWillEnter(){
    this.loadData();
    if(!this.isEnabledForm){
      this.disableForm();
    }
  }

  ionViewDidLeave(){
    this.isEnabledForm = false;
    this.avatarChanged = false;
    
  }

  enableForm(){
    this.isEnabledForm = true;
    this.updateForm.controls['firstName'].enable();
    this.updateForm.controls['secondName'].enable();
    this.updateForm.controls['lastName'].enable();
    this.updateForm.controls['secondLastName'].enable();
    this.updateForm.controls['phone'].enable();
  }

  disableForm(){
    this.updateForm.controls['firstName'].disable();
    this.updateForm.controls['secondName'].disable();
    this.updateForm.controls['lastName'].disable();
    this.updateForm.controls['secondLastName'].disable();
    this.updateForm.controls['phone'].disable();
  }

  async loadData(){
    await this.storage.getItem('userLogged')
    .then((data) =>{
      this.userLogged = this.handler.createUserObject(data);
      this.storage.getItem('patientLogged')
      .then((data) => {
        this.patientLogged = this.handler.createPatientObject(JSON.parse(data));
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
    this.pnombre = this.patientLogged.pnombrePaciente;
    this.snombre = this.patientLogged.snombrePaciente;
    this.apaterno = this.patientLogged.apaternoPaciente;
    this.amaterno = this.patientLogged.amaternoPaciente;
    this.tel = this.patientLogged.telPaciente;

    this.updateForm.controls['firstName'].setValue(this.pnombre);
    this.updateForm.controls['secondName'].setValue(this.snombre);
    this.updateForm.controls['lastName'].setValue(this.apaterno);
    this.updateForm.controls['secondLastName'].setValue(this.amaterno);
    this.updateForm.controls['phone'].setValue(this.tel);
  }

  async updateUserData(){
    if (this.updateForm.valid){
      const values = Object.values(this.updateForm.value)
      let updateValues = {
        pnombre : values[0] as string,
        snombre : values[1] as string,
        apaterno : values[2] as string,
        amaterno : values[3] as string,
        tel : values[4] as number
      }
      let newPaciente : Paciente = new Paciente(
        this.patientLogged.numrunPaciente,
        this.patientLogged.dvRunPaciente,
        updateValues.pnombre,
        updateValues.snombre,
        updateValues.apaterno,
        updateValues.amaterno,
        updateValues.tel,
        this.patientLogged.idUser)
      await this.bd.updatePacienteData(newPaciente)
      .then(async () =>{
        let dataNew = {
          numrun : newPaciente.numrunPaciente,
          dvrun : newPaciente.dvRunPaciente,
          pnombre : newPaciente.pnombrePaciente,
          snombre : newPaciente.snombrePaciente,
          apaterno : newPaciente.apaternoPaciente,
          amaterno : newPaciente.amaternoPaciente,
          tel : newPaciente.telPaciente,
          id : this.patientLogged.idUser
        }
        await this.storage.setItem('patientLogged',JSON.stringify(dataNew))
        .then(() =>{
          this.router.navigate(['/tab-paciente'])
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
    this.avatarPath = image.path as string // DEPRECADO
    this.avatarObj = JSON.stringify(image);
    //console.log('DFO: objeto ruta '+ typeof(image.path))
    this.avatar = image.webPath;
  };


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

  async submitAvatar(avatar : string){
    console.log('DFO: objeto '+avatar)
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
        this.router.navigate(['/tab-paciente']);
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
        this.logOutSession();
      })
    } else {
      this.toast.presentToast('El nuevo email no puede ser el actual')
    }
  }

  logOutSession(){
    this.bd.insertLog(this.userLogged.idUser,7)
    .then(async() =>{
      this.bd.logOut();
      await this.alert.alertNavigation('','Su sesión ha sido cerrada','Vuelva a introducir sus credenciales para entrar')
    })
    //this.router.navigate(['']);
  }

  async confirmChangeEmail(){
    const alert = await this.alertController.create(
      {
        header : 'Cambiar Email',
        subHeader : '¿Está seguro de cambiar su email?',
        message : 'Su sesión será cerrada al proceder con el cambio, deberá iniciar sesión con su nuevo correo.',
        buttons : [{
          text : "Cancelar",
          role : 'cancel'
        },
        {
          text : "Confirmar",
          role : "confirm",
          handler : ()=>{
            this.changeEmail();
          }
        }]
      });
    await alert.present();
  }

  async confirmChangePw(){
    const alert = await this.alertController.create(
      {
        header : 'Cambiar Contraseña',
        subHeader : '¿Está seguro de cambiar su contraseña?',
        message : 'Su sesión será cerrada al proceder con el cambio, deberá iniciar sesión con su nueva contraseña.',
        buttons : [{
          text : "Cancelar",
          role : 'cancel'
        },
        {
          text : "Confirmar",
          role : "confirm",
          handler : ()=>{
            this.changePw();
          }
        }]
      });
    await alert.present();
  }

  async confirmLogout(){
    const alert = await this.alertController.create(
      {
        header : 'Cerrar Sesión',
        subHeader : '¿Desea cerrar su sesión activa?',
        message : '',
        buttons : [{
          text : "Cancelar",
          role : 'cancel'
        },
        {
          text : "Confirmar",
          role : "confirm",
          handler : ()=>{
            this.logOutSession()
          }
        }]
      });
    await alert.present();
  }
}
