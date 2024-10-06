import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';
import { CitaMedica } from 'src/app/classes/cita-medica';
import { AlertService } from 'src/app/services/alert.service';
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
  listaCitas : Array<CitaMedica> = [];  // almacena las citas tomadas del medico
  citasDisponibles : Array<CitaMedica> = [];  // almacena los bloques de citas disponibles
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
  // testing
  listaFalsa: any = [1,2,3,4,5,6,7,8,9,10]
  
  constructor(
    private router:Router, 
    private activatedroute:ActivatedRoute,
    private alertController : AlertController,
    private today : TodayDateService,
    private bd : ServicebdService,
    private stroage : NativeStorage,
    private alert : AlertService) { 
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
            console.log('DFO: Obteniendo citas')
            let list: Array<CitaMedica> = Object.values(data)
            this.listaCitas = list;
          }).catch(e => {
            this.listaCitas = [];
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
        if (list[0]=== mes && list[1] === dia){
          exists = true;
        }
      });
    }
    return exists;
  }

  showList(day : string){
    this.hideList=false;
    this.dateStr = this.today.formatDate(day)
    this.createListaCitas(day);
  }

  /// no estoy usando esta funcion por limitaciones del datetime
  changeDaysAvailable(day : string){
    const stripDay = this.today.splitDate(day);
    const mes = stripDay[1]
    let daysAvailable : Array<number> = [];
    //const dia = stripDay[2]
    if(this.agendaList.length>0){
      this.agendaList.forEach( agenda => {
        let list = Object.values(agenda);
        if (list[0]=== mes){
          daysAvailable.push(parseInt(list[1]))
        }
      });
    }
    return daysAvailable

  }

  createListaCitas(day : string){
    console.log('DFO: en createListaCitas');
    const splitDay = this.today.splitDate(day);
    const dia = parseInt(splitDay[2])
    const mes = parseInt(splitDay[1])
    const anno = parseInt(splitDay[0])
    
    let cita : CitaMedica; 

    let listaBloques : Array<CitaMedica> = []

    if (this.agendaList.length>0){
      this.agendaList.forEach( agenda => {
        let list = Object.values(agenda);
        if(list[0] == mes && list[1] == dia){
          let dateStrStart = splitDay[0]+'-'+splitDay[1]+'-'+splitDay[2]+'T'+list[2];
          let dateStrEnd = splitDay[0]+'-'+splitDay[1]+'-'+splitDay[2]+'T'+list[3];
          let blocks = this.today.createMinBlocks(dateStrStart,dateStrEnd,this.medicObj.tiempoBloque)
          let sumMinutes = this.today.timeToMs(dateStrStart)
          for (let i = 0; i<blocks;i++){
            let minToStr = this.today.parseTimeToStr(new Date(sumMinutes))
            console.log('DFO: bloque cita: '+'mes'+'-'+dia+'-'+minToStr);
            sumMinutes += this.medicObj.tiempoBloque*60000
            cita = new CitaMedica(mes, dia, anno, minToStr);
            listaBloques.push(cita);
          }
          this.verifyLists(listaBloques, this.listaCitas);
        }
      })
    }
  }

  verifyLists(bloques : Array<CitaMedica>, citas : Array<CitaMedica>){
    console.log('DFO: en verifyLists')
    let preLista : Array<CitaMedica> = [];
    if(citas.length>0){
      bloques.forEach(bloq => {
        citas.forEach(cita => {
          let bloqValues = Object.values(bloq);
          let citaValues = Object.values(cita);
          console.log('DFO: buscando en listas')
          if(bloqValues[0] != citaValues[0] && bloqValues[1] != citaValues[1] && bloqValues[2] != citaValues[2] && bloqValues[3] != citaValues[3]){
            console.log('DFO: verifyLists : no existe una coincidencia');
            preLista.push(bloq)
          }
        })
      })
    } else {
      this.citasDisponibles = bloques;
      
    }
    if(preLista.length==0){
      this.citasDisponibles = bloques;
    } else {
      this.citasDisponibles = preLista
    }
    console.log('DFO largo citasDisponibles '+this.citasDisponibles.length)
  }

  saveCita(datosCita : CitaMedica, numrunMedico : number){
    // ejemplo seria saveCita(cita, medicObj.numrunMedico)
    let numrunPaciente : number;
    this.stroage.getItem('patientLogged')
    .then((data) => {
      let val = Object.values(JSON.parse(data));
      numrunPaciente = val[0] as number;
      let citaObj = {
        annoCita : datosCita.anno,
        mesCita : datosCita.mes,
        diaCita : datosCita.dia,
        horaCita : datosCita.hora+':00',
        idEstado : 1,
        numrunPaciente : numrunPaciente,
        numrunMedico : numrunMedico
      }
      this.bd.insertCitaMedica(citaObj)
      .then(() =>{
        this.alert.alertNavigation('/tab-paciente/main-page','Hora agendada','Su hora ha sido agendada, recibirá un email con más información.')
      })
    })
    
    
  }

  async confirmAlert(day : string, hour : string, medicName : string, box : string, citaObj : CitaMedica){
    const alert = await this.alertController.create(
      {
        header : "Confirmar Hora",
        subHeader : "¿Desea confirmar su consulta médica?",
        message : day + " Hora: " + hour +"hrs. Dr. "+medicName+' '+box,
        buttons : [{
          text : "Cancelar",
          role : 'cancel'
        },
        {
          text : "Confirmar",
          role : "confirm",
          handler : ()=>{
            this.saveCita(citaObj, this.medicObj.numrunMedico)
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
