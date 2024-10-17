import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { NewPatientForm } from './new-medic-account-patient.form';
import { NewMedicForm } from './new-medic-account-medic.form';
import { NewAdminForm } from './new-medic-account-admin.form';
import { EncoderService } from 'src/app/services/encoder.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { User } from 'src/app/classes/user';
import { ObjectHandlerService } from 'src/app/services/object-handler.service';
import { Router } from '@angular/router';
import { AlerttoastService } from 'src/app/services/alerttoast.service';

@Component({
  selector: 'app-new-medic-account',
  templateUrl: './new-medic-account.page.html',
  styleUrls: ['./new-medic-account.page.scss'],
})
export class NewMedicAccountPage implements OnInit {
  roleSelected : number = 0;
  especialidadesList : any = [];
  userLogged! : User;

  // formularios
  patientForm! : FormGroup;
  medicForm! : FormGroup;
  adminForm! : FormGroup;
  constructor(
    private bd : ServicebdService, 
    private formBuilder : FormBuilder, 
    private ec : EncoderService, 
    private storage : NativeStorage,
    private handler : ObjectHandlerService,
    private router : Router,
    private toast : AlerttoastService) { }

  ngOnInit() {
    this.loadData();
  }

  async loadData(){
    await this.storage.getItem('userLogged')
    .then(data => {
      this.userLogged = this.handler.createUserObject(data);
    })
    this.fillEspecialidades();
    this.patientForm = new NewPatientForm(this.formBuilder).createForm();
    this.medicForm = new NewMedicForm(this.formBuilder).createForm();
    this.adminForm = new NewAdminForm(this.formBuilder).createForm();
  }

  ionViewWillEnter(){
    this.loadData();
  }

  ionViewDidLeave(){
    this.roleSelected = 0;
  }

  selectRole(event: any){
    this.roleSelected = event.detail.value
  }

  async fillEspecialidades(){
    this.bd.getSpecialities().subscribe(data =>{
      this.especialidadesList = data
    }, e => console.log('DFO: error especialidades '+JSON.stringify(e)))
  }


  async createNewAccount(rol : number){
    console.log('DFO: creando cuenta con rol '+rol)
    // testing
    let formValues;
    if(rol==1){
      console.log('DFO: cuenta paciente')
      formValues = Object.values(this.patientForm.value);
      let userOb = {
        email : formValues[6],
        pw : formValues[7]
      }
      let run = formValues[4] as string
      let splitRun = run.split('-')
      let patOb = {
        pnombre : this.ec.convertStringISO(formValues[0] as string),
        snombre : this.ec.convertStringISO(formValues[1] as string),
        apaterno : this.ec.convertStringISO(formValues[2] as string),
        amaterno : this.ec.convertStringISO(formValues[3] as string),
        numrun : parseInt(splitRun[0]),
        dvrun : splitRun[1],
        phone : formValues[5]
      }
      let send : Array<object> = [userOb, patOb]
      await this.bd.checkEmailExists(userOb.email as string)
      .then(async res =>{
        if (!res){
          await this.bd.createUserFromAdmin(rol, send)
          .then(() =>{
            this.bd.insertLog(this.userLogged.idUser,1)
            this.toast.presentToast('El usuario fue creado con éxito')
            this.router.navigate(['/tab-admin/main-admin-page']);
          }) 
        }else{
          this.toast.presentToast('Este correo ya esta siendo usado por otro usuario')
        }
      })
    }
    if(rol==2){
      console.log('DFO: cuenta medico +'+this.medicForm.value)
      formValues = Object.values(this.medicForm.value);
      let userOb = {
        email : formValues[9],
        pw : formValues[10]
      }
      let run = formValues[4] as string
      let splitRun = run.split('-')
      let medOb = {
        pnombre : this.ec.convertStringISO(formValues[0] as string),
        snombre : this.ec.convertStringISO(formValues[1] as string),
        apaterno : this.ec.convertStringISO(formValues[2] as string),
        amaterno : this.ec.convertStringISO(formValues[3] as string),
        numrun : parseInt(splitRun[0]),
        dvrun : splitRun[1],
        phone : formValues[5],
        box : formValues[6],
        idEsp : formValues[7],
        bloque : formValues[8]
      }

      let send : Array<object> = [userOb, medOb]
      await this.bd.checkEmailExists(userOb.email as string)
      .then(async res =>{
        if (!res){
          await this.bd.createUserFromAdmin(rol, send)
          .then(() =>{
            this.bd.insertLog(this.userLogged.idUser,1)
            this.toast.presentToast('El usuario fue creado con éxito')
            this.router.navigate(['/tab-admin/main-admin-page']);
          }) 
        }else{
          this.toast.presentToast('Este correo ya esta siendo usado por otro usuario')
        }
      })
    }
    if(rol==3){
      console.log('DFO: creando cuenta admin')
      formValues = Object.values(this.medicForm.value);
      let userOb = {
        email : formValues[8],
        pw : formValues[9]
      }

      let send : Array<object> = [userOb];
      await this.bd.checkEmailExists(userOb.email as string)
      .then(async res =>{
        if (!res){
          await this.bd.createUserFromAdmin(rol, send)
          .then(() =>{
            this.bd.insertLog(this.userLogged.idUser,1)
            this.toast.presentToast('El usuario fue creado con éxito')
            this.router.navigate(['/tab-admin/main-admin-page']);
          }) 
        }else{
          this.toast.presentToast('Este correo ya esta siendo usado por otro usuario')
        }
      })
    }
  }

}
