import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {
  medicObj : any;
  user : any;
  today = new Date(Date.now())
  year = this.today.getFullYear();
  month = this.today.getMonth() + 1;  // estrictamente necesario que sume uno más al mes
  day = this.today.getDate();
  minDate : string = "";  //define la fecha en que inicia el calendario
  maxDate : string = "";  //define la fecha de corte del calendario
  selectedDate : any;     //mantiene la fecha seleccionada
  dateStr : string = "";
  hourList : any;
  hideList : boolean = true;
  takenHrs : any;
  
  constructor(
    private router:Router, 
    private activatedroute:ActivatedRoute,
    private alertController : AlertController) { 
    this.activatedroute.queryParams.subscribe( param => {
      if(this.router.getCurrentNavigation()?.extras.state){
        this.medicObj = this.router.getCurrentNavigation()?.extras?.state?.['medicObj'];
        this.user = this.router.getCurrentNavigation()?.extras?.state?.['user'];
      }
    });
  }

  ngOnInit() {
    let monthToString = "";
    if (this.month < 10) {
      monthToString = "0"+ this.month.toString();
    } else {
      monthToString = this.month.toString();
    }
    let dayToString = "";
    if (this.day < 10) {
      dayToString = "0" + this.day.toString();
    } else {
      dayToString = this.day.toString();
    }
    let yearToString = this.year.toString();

    this.minDate = yearToString + "-" + monthToString +"-"+ dayToString;
    this.maxDate = this.medicObj.fechaCierre;

    fetch('./assets/json/hoursTaken.json')
    .then(res => res.json())
    .then(json => {
      this.takenHrs = json;
    })
  }

  testFn(){
    console.log("COnfirmado")
  }

  parseMinToString(date : number){
    const formatDate = new Date(date);
    const hour = formatDate.getHours();
    const min = formatDate.getMinutes();
    let minStr = min.toString();
    if (min < 10) {
      minStr = "0" + min.toString();
    }
    const hrStr = hour.toString() + ":" + minStr;
    return hrStr;
  }
  formatDate(date : string){
    const meses = ["Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre"
    ];
    let arrDate = date.substring(0,10).split("-");
    let monthIdx = parseInt(arrDate[1])
    let month = meses[monthIdx-1]
    return String(arrDate[2] + " de "+ month + " de "+ arrDate[0]);
  }

  populateHourList(selDate : string, medic : any){
    this.dateStr=this.formatDate(selDate.substring(0,10));
    this.hourList = [];
    let dateSelected = selDate.substring(0,10).split("-")
    let startHour = medic.horaInicio.split(":");
    let endHour = medic.horaTermino.split(":");
    let medId = medic.id;
    let range = medic.rango;
    //let hourFormat = startHr.split(":")
    let formattedDateStart = new Date(
      parseInt(dateSelected[0]), 
      parseInt(dateSelected[1])-1, 
      parseInt(dateSelected[2]),
      parseInt(startHour[0]),
      parseInt(startHour[1]));
    let formattedDateEnd = new Date(
      parseInt(dateSelected[0]),
      parseInt(dateSelected[1])-1,
      parseInt(dateSelected[2]),
      parseInt(endHour[0]),
      parseInt(endHour[1]));
    // calcula la cantidad de bloques a crear segun la diferencia entre la hora de entrada y la hora de salida
    // dividido por el rango de tiempo entre cada bloque
    let blocks = (formattedDateEnd.getTime() - formattedDateStart.getTime())/(range*60000);
    var sumMinutes = formattedDateStart.getTime(); // hora inicial en milisegundos, se va a ir sumando en el loop
    for (let i = 0; i < blocks;i++){
      let parseMinToStr = this.parseMinToString(sumMinutes)
      let available = true;
      for (let hr = 0; hr < this.takenHrs.length; hr++) {
        if (this.takenHrs[hr].medId == medId && this.takenHrs[hr].fecha === selDate.substring(0,10) && this.takenHrs[hr].hora == parseMinToStr) {
          available = false;
        }
      }
      this.hourList.push({
        fecha : selDate.substring(0,10),
        hora : parseMinToStr,
        disponible : available
      });
      sumMinutes += range*60000;
    }
    this.hideList=false;
  }

  async confirmAlert(day : string, hour : string, medicName : string){
    const alert = await this.alertController.create(
      {
        header : "Confirmar Hora",
        subHeader : "¿Desea confirmar su consulta médica en la hora seleccionada?",
        message : day + " Hora: " + hour +"hrs.",
        buttons : [{
          text : "Cancelar",
          role : 'cancel'
        },
        {
          text : "Confirmar",
          role : "confirm",
          handler : ()=>{
            this.saveDate(day, hour, medicName);
          }
        }]
      });
    await alert.present();
  }
  async saveDate(svDay : string, svHr : string, medicName : string){
    const alert = await this.alertController.create(
      {
        header : "Su hora ha sido confirmada",
        message : "Recibirá un mensaje en su correo electrónico con la información de su hora médica. Puede revisar su hora agendada en el Inicio",
        buttons : ['Aceptar']
      }
    );
    await alert.present();
    let navigationextras : NavigationExtras = {
      state : {
        dateSaved : {
          day : svDay,
          hour : svHr,
          medic : medicName
        },
        user : this.user
      }
    }
    this.router.navigate(['/main-page'], navigationextras);
    this.selectedDate = "";
  }
}
