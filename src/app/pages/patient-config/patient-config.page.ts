import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';
import { EncoderService } from 'src/app/services/encoder.service';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-patient-config',
  templateUrl: './patient-config.page.html',
  styleUrls: ['./patient-config.page.scss'],
})
export class PatientConfigPage implements OnInit {
  patient : any = {
    mes : 0,
    dia : 0,
    anno : 0,
    hora : "",
    estado : 0,
    numrunPaciente : 0, 
    dvrunPaciente : "",
    nombrePaciente : "",
    telPaciente : 0,
    id: 0
  }
  loadReady : boolean = false;
  constructor(
    private bd : ServicebdService,
    private storage : NativeStorage,
    private ec : EncoderService,
    private router : Router,
    private alertController : AlertController) { 
      this.loadData();
    }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.loadData();
  }

  async loadData(){
    await this.storage.getItem('selectedPatient')
    .then((data) =>{
      let pat = Object.values(data)
      let nomEncode = this.ec.convertStringUTF8(pat[7] as string)
      this.patient = {
        mes : pat[0],
        dia : pat[1],
        anno : pat[2],
        hora : pat[3],
        estado : pat[4],
        numrunPaciente : pat[5], 
        dvrunPaciente : pat[6],
        nombrePaciente : nomEncode,
        telPaciente : pat[8],
        id: pat[9]
      };
      this.loadReady = true;
    }).catch(e => console.log('DFO: No se pudo encontrar paciente '+JSON.stringify(e)))
  }

  stateVal(id : number){
    const stateList = ['Activo', 'Cancelado', 'Finalizado'];
    return stateList[id-1];
  }

  async updateCita(idCita : number, estadoCita : number){
    await this.bd.updateCita(idCita,estadoCita)
  }

  async confirmAlert(idCita : number, estado : number){
    let titulo = '';
    let msj = '';
    switch(estado){
      case 2:
        titulo = 'Cancelar Cita'
        msj = '¿Está seguro de cancelar esta cita médica? Recuerde avisar con anticipación a su paciente.'
        break;
      case 3:
        titulo = 'Finalizar Cita'
        msj = '¿Está seguro de Finalizar esta cita?'
        break;
      default:
        break;
    }
    const alert = await this.alertController.create(
      {
        header : titulo,
        subHeader : msj,
        message : '',
        buttons : [{
          text : "Cancelar",
          role : 'cancel'
        },
        {
          text : "Confirmar",
          role : "confirm",
          handler : ()=>{
            this.updateCita(idCita, estado);
          }
        }]
      });
    await alert.present();
  }
}
