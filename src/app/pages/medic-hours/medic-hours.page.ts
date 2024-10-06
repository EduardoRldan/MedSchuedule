import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController, ToastController } from '@ionic/angular';
import { Medic } from 'src/app/classes/medic';
import { ObjectHandlerService } from 'src/app/services/object-handler.service';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { TodayDateService } from 'src/app/services/today-date.service';

@Component({
  selector: 'app-medic-hours',
  templateUrl: './medic-hours.page.html',
  styleUrls: ['./medic-hours.page.scss'],
})
export class MedicHoursPage implements OnInit {
  // Faltan construir las consultas a la base de datos, el objetivo es
  // Al inicio debe construir la lista de agendas disponibles del año y el trimestre para generar el calendario
  // Al seleccionar el año y el trimestre debe desplegar el calendario limitado a los meses disponibles por trimestre
  // Junto con el calendario debe hacerse la consulta de las agendas que ya esten guardadas en la tabla y almacenar en una lista
  // Al seleccionar un día del calendario los botones de selección se mostrarán dependiendo de si existe el día agendado o
  // no hay ningun día agendado en la tabla (modificar o crear).

  // Medico
  medicLogged! : Medic;
  tBloque : number = 30;

  // Lista de Consultas año-trimestre
  annoTrimestre : any = {
    idAnno : 0,
    anno : 0,
    idTrimestre : 0,
    meses : []
  }
  // Lista consultas agenda
  agendaList : Array<object> = [];
  /// mantener el formato de objeto
  agendaObj : object = {
    mes : 0,
    dia : 0,
    horaInicio : "",
    horaTermino : "",
    numrunMedico : 0,
    idAnno : 0
  }

  showOptions : boolean = false;
  showCalendar : boolean = false;
  daySelected! : string;
  previousSelect : string = "";
  // validadores de fecha
  defDate : string = ""
  monthConstraing : Array<number> = []
  startHour! : string;
  endHour! : string;
  breakStart! : string;
  breakEnd! : string;

  indicator : number = 0;
  constructor(
    private alertController : AlertController, 
    private toastController : ToastController, 
    private today : TodayDateService,
    private bd : ServicebdService,
    private storage : NativeStorage,
    private handler : ObjectHandlerService,
    private router : Router) { 
      this.storage.getItem('medicLogged')
      .then((data)=>{
        console.log('DFO: Medico encontrado')
        this.medicLogged = this.handler.createMedicObject(JSON.parse(data))
      })
      this.bd.getAnoTrimestre()
      .then(() =>{
        this.storage.getItem('annoTrimestre')
        .then((data)=> {
          console.log('DFO: Datos obtenidos ')
          let obj = data;
          this.annoTrimestre = obj;
          this.bd.getAgenda(this.medicLogged.numrunMedico,this.annoTrimestre.idAnno)
          .then(() =>{
            this.storage.getItem('agendaLista')
            .then((data) => {
              let list: Array<object> = Object.values(data)
              console.log('DFO: desde medic-hours '+list)
              console.log('DFO: '+Object.values(list[0]))
              this.agendaList = list;
            })
          })
        })
      });

      this.defDate = this.today.tomorrowDate();
      this.daySelected = this.defDate
      this.startHour = this.defDate
      this.endHour = this.defDate
      this.breakStart = this.defDate
      this.breakEnd = this.defDate
    }

  ngOnInit() {
  }

  loadCalendar(){
    this.showCalendar = true;
  }
  valueChanged(valueBefore : any, valueAfter : any){
    if (valueBefore === valueAfter) {
      return false;
    } else {
      return true;
    }
  }

  triggerDate(event : any){
    this.daySelected = event.detail.value;
    this.showBtnOptions(this.daySelected)
  }
  showBtnOptions(day : string){
    // debe devolver un verdadero o falso si el día ya tiene su agenda o no respectivamente
    console.log('DFO: daySelected '+this.daySelected)
    if (this.valueChanged(this.previousSelect, day)){
      this.previousSelect = day;
      this.showOptions = false;
    }
    let stripDay = this.today.splitDate(day);
    let idAnno = this.annoTrimestre.idAnno;
    let mmonth = parseInt(stripDay[1]);
    let dd = parseInt(stripDay[2]);
    // aquí debe consultarse a la lista si algun elemento corresponde al día seleccionado
    //testeo
    let exists : boolean = false;
    if(this.agendaList.length>0){
      this.agendaList.forEach( agenda => {
        let list = Object.values(agenda);
        // console.log('DFO: dato obtenido dia'+dd+' mes '+mmonth+' idAnno '+idAnno)
        // console.log('DFO: dato lectura'+list[1]+' mes '+list[0]+' idAnno '+idAnno)
        if (list[0]=== mmonth && list[1] === dd && list[5] === idAnno){
          exists = true;
          console.log('DFO: agenda existe')
        }
      });
    }
    return exists
  }

  recorreLista(){
    for(let i = 0;i<this.agendaList.length;i++){
      let obj = Object.values(this.agendaList[i])
      console.log('DFO: '+obj)
    }
  }

  loadOptions(){
    this.showOptions = true;
  }

  saveToList() {
    // funcion que almacena las agendas en una lista interna
    console.log('DFO: guardando lista')
    const daySplit = this.today.splitDate(this.daySelected);
    const start = this.today.splitHour(this.startHour);
    const end = this.today.splitHour(this.endHour);
    const brStart = this.today.splitHour(this.breakStart);
    const brEnd = this.today.splitHour(this.breakEnd);
    const agObj1 = {
      mes : parseInt(daySplit[1]),
      dia : parseInt(daySplit[2]),
      horaInicio : start,
      horaTermino : brStart,
      numrunMedico : this.medicLogged.numrunMedico,
      idAnno : this.annoTrimestre.idAnno
    }
    const agObj2 = {
      mes : parseInt(daySplit[1]),
      dia : parseInt(daySplit[2]),
      horaInicio : brEnd,
      horaTermino : end,
      numrunMedico : this.medicLogged.numrunMedico,
      idAnno : this.annoTrimestre.idAnno
    }
    console.log('DFO: id_anno '+ this.annoTrimestre.idAnno)
    this.agendaList.push(agObj1)
    this.agendaList.push(agObj2)
  }

  isHigherThanStart(){
    let valid : boolean = false
    const start = this.today.splitHour(this.startHour);
    const end = this.today.splitHour(this.endHour);
    const brStart = this.today.splitHour(this.breakStart);
    const brEnd = this.today.splitHour(this.breakEnd);

    let inicial = start.split(":").map(Number)
    let middle = brStart.split(":").map(Number)
    let midEnd = brEnd.split(":").map(Number)
    let final = end.split(":").map(Number)

    let ini = (inicial[0] * 3600) + (inicial[1] * 60) + inicial[2];
    let mid1 = (middle[0] * 3600) + (middle[1] * 60) + middle[2];
    let mid2 = (midEnd[0] * 3600) + (midEnd[1] * 60) + midEnd[2];
    let en = (final[0] * 3600) + (final[1] * 60) + final[2];

    if(ini>mid1 || ini>mid2 || ini>en || mid1>mid2 || mid1>en || mid2>en){
      valid = true;
    } else {
      valid = false;
    }
    return valid
  }

  bloqueIsValid(){
    if (this.tBloque>=10 && this.tBloque<=60){
      return true
    } else {
      return false
    }
  }

  async submitToDB(){
    this.router.navigate(['/main-page-medic'])
    return this.bd.insertNewAgenda(this.agendaList)
    
    // funcion que guarda la lista nueva de agendas en la base de datos
  }
  async confirmAlert() {
    const alert = await this.alertController.create({
      header: 'Guardar Agenda',
      subHeader: '¿Está seguro que desea guardar subir su agenda?',
      message: 'Al guardar el sistema habilitará la toma de horas, si algún paciente toma una hora médica, tendrá que cancelarla antes de volver a modificar la agenda.',
      buttons: [{
        text : 'Guardar Agenda',
        role : 'confirm',
        handler : ()=>{
          console.log("Confirmado");
          this.submitToDB();
        }
      },
      {
          text : 'Cancelar',
          role : 'cancel',
          handler : () =>{
            console.log("Canelado");
          }
      }]
    });

    await alert.present();
  }

  async presentToast(msj : string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();
  }
}
