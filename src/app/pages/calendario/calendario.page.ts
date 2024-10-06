import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { TodayDateService } from 'src/app/services/today-date.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {
  medicObj : any;
  user : any;
  listaCitas : Array<object> = [];
  citaMedica : any ={
    mes : 0,
    dia : 0,
    anno : 0,
    hora : ""
  };
  minDate : string = "";  //define la fecha en que inicia el calendario
  currentYear! : number;
  maxDate : string = "";  //define la fecha de corte del calendario NO SE NECESITA
  selectedDate : any;     //mantiene la fecha seleccionada
  dateStr : string = "";
  agendaList! : Array<object>
  hourList : any; // no se necesita
  hideList : boolean = true;
  takenHrs : any;
  
  constructor(
    private router:Router, 
    private activatedroute:ActivatedRoute,
    private alertController : AlertController,
    private today : TodayDateService,
    private bd : ServicebdService,
    private stroage : NativeStorage) { 
    this.activatedroute.queryParams.subscribe( param => {
      if(this.router.getCurrentNavigation()?.extras.state){
        this.medicObj = this.router.getCurrentNavigation()?.extras?.state?.['medicObj'];
      }
    });
    
  }

  ngOnInit() {
    this.minDate = this.today.todayDate();
    this.selectedDate = this.minDate;
    let split = this.today.splitDate(this.minDate);
    this.bd.getAgendaWithYear(this.medicObj.numrunMedico, parseInt(split[0]))
    .then(()=>{
      this.stroage.getItem('agenda'+this.medicObj.numrunMedico)
      .then((data) => {
        let list: Array<object> = Object.values(data)
        this.agendaList = list;
        this.bd.getCitasMedicasMedico(this.medicObj.numrunMedico)
        .then(() =>{
          this.stroage.getItem('citas'+this.medicObj.numrunMedico)
          .then(data => {
            let list: Array<object> = Object.values(data)
            this.listaCitas = list;
          })
        })
      })
    })
  }

  dayExists(day: string){
    // retorna verdadero o falso si el día seleccionado está en la lista de agendas del medico seleccionado
    let exists : boolean = false;
    const stripDay = this.today.splitDate(day);
    const mes = parseInt(stripDay[1])
    const dia = parseInt(stripDay[2])
    if(this.agendaList.length>0){
      this.agendaList.forEach( agenda => {
        let list = Object.values(agenda);
        console.log('DFO: mes-dia: '+list[0]+'-'+list[1])
        if (list[0]=== mes && list[1] === dia){
          exists = true;
          console.log('DFO: agenda existe')
        }
      });
    }
    return exists;
  }
  showList(day : string){
    this.hideList=false;
    this.dateStr = this.today.formatDate(day)
  }

  changeDaysAvailable(day : string){
    const stripDay = this.today.splitDate(day);
    const mes = stripDay[1]
    let daysAvailable : Array<number> = [];
    //const dia = stripDay[2]
    if(this.agendaList.length>0){
      this.agendaList.forEach( agenda => {
        let list = Object.values(agenda);
        // console.log('DFO: dato obtenido dia'+dd+' mes '+mmonth+' idAnno '+idAnno)
        // console.log('DFO: dato lectura'+list[1]+' mes '+list[0]+' idAnno '+idAnno)
        if (list[0]=== mes){
          daysAvailable.push(parseInt(list[1]))
        }
      });
    }
    return daysAvailable

  }

  createListaCitas(day : string){
    const split = this.today.splitDate(day);
    
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
    console.log('DFO: cambio fecha '+selDate)
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
    this.router.navigate(['/tab-paciente/main-page'], navigationextras);
    this.selectedDate = "";
  }
}
