import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
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


  // Lista de Consultas año-trimestre
  annoTrimestreList : any =[
    {
      id : 1,
      anno : 2024,
      id_trimestre : 4
    }
  ];
  // Lista consultas agenda
  agendaList : any = [];
  // lista que se pobla según los meses del trimestre seleccionado
  monthEnabledList : any = [10, 11, 12]

  showOptions : boolean = false;
  showCalendar : boolean = false;
  daySelected : string = "";
  previousSelect : string = "";
  // validadores de fecha
  todayDate = new Date(Date.now())
  year = this.todayDate.getFullYear();
  month = this.todayDate.getMonth() + 1;
  currentDay = this.todayDate.getDate() +1; // Siempre será el día siguiente al día en que se está consultando
  minDate : string = "";

  constructor(private alertController : AlertController, private toastController : ToastController, private today : TodayDateService) { }

  ngOnInit() {
    // this.annoTrimestreList.filter()
    let monthToStr = "";
    if (this.month < 10) {
      monthToStr = "0" + this.month.toString();
    } else {
      monthToStr = this.month.toString();
    }
    let dayToStr = "";
    if (this.currentDay < 10){
      dayToStr = "0"+ this.currentDay.toString();
    } else {
      dayToStr = this.currentDay.toString();
    }
    let yearToStr = this.year.toString();
    this.minDate = yearToStr + '-' + monthToStr + '-' + dayToStr;
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
  showBtnOptions(day : string){
    // debe devolver un verdadero o falso si el día ya tiene su agenda o no respectivamente
    if (this.valueChanged(this.previousSelect, day)){
      this.previousSelect = day;
      this.showOptions = false;
    }
    let stripDay = day.substring(0,10).split('-');
    let year = parseInt(stripDay[0]);
    let mmonth = parseInt(stripDay[1]);
    let dd = parseInt(stripDay[2]);
    // aquí debe consultarse a la lista si algun elemento corresponde al día seleccionado
    //testeo
    if (dd>20){
      return true;
    }
    return false;
  }
  loadOptions(){
    this.showOptions = true;
  }

  saveTolist() {
    // funcion que almacena las agendas en una lista interna
  }

  submitToDB(){
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
