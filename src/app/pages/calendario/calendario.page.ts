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
  medicObj : any = {
    numrunMedico : 0,
    dvrunMedico : "",
    nombreMedico : "",
    idEsp : 0,
    especialidad : "",
    tiempoBloque : 0,
    boxMedico : ""
  };
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
  
  constructor(
    private alertController : AlertController,
    private today : TodayDateService,
    private bd : ServicebdService,
    private stroage : NativeStorage,
    private alert : AlertService) { 
      // como esto solo se activa una vez, se vuelve a llamar desde ionWillEnter
      this.loadData();
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.loadData();
  }

  ionViewDidLeave(){
    this.hideList = true;
  }
  
  loadData(){
    console.log('DFO: cargando datos');
    this.minDate = this.today.todayDate();
    this.selectedDate = this.minDate;
    let split = this.today.splitDate(this.minDate);
    // aqui empiezan las promesas
    this.stroage.getItem('medicSelected')
    .then((data) => {
      //console.log('DFO: dato encontrado '+JSON.stringify(data))
      this.medicObj = data;
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
              //console.log('DFO: Obteniendo citas')
              let list: Array<CitaMedica> = Object.values(data)
              this.listaCitas = list;
            }).catch(e => {
              this.listaCitas = [];
            })
          })
        }).catch(e => {
          console.log('DFO: no hay citas')
          this.agendaList = [];
        })
      })
    }).catch(e => console.log('DFO: error obteniendo medico '+JSON.stringify(e)))
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
    if (this.agendaList != listaBloques){
      if (this.agendaList.length>0){
        console.log('DFO: hay elementos en la lista')
        this.agendaList.forEach( agenda => {
          let list = Object.values(agenda);
          if(list[0] == mes && list[1] == dia){
            let dateStrStart = splitDay[0]+'-'+splitDay[1]+'-'+splitDay[2]+'T'+list[2];
            let dateStrEnd = splitDay[0]+'-'+splitDay[1]+'-'+splitDay[2]+'T'+list[3];
            let blocks = this.today.createMinBlocks(dateStrStart,dateStrEnd,this.medicObj.tiempoBloque)
            let sumMinutes = this.today.timeToMs(dateStrStart)
            for (let i = 0; i<blocks;i++){
              let minToStr = this.today.parseTimeToStr(new Date(sumMinutes))
              //console.log('DFO: bloque cita: '+'mes'+'-'+dia+'-'+minToStr);
              sumMinutes += this.medicObj.tiempoBloque*60000
              cita = new CitaMedica(mes, dia, anno, minToStr);
              listaBloques.push(cita);
            }
          }
        })
      }
    }
    this.verifyLists(listaBloques, this.listaCitas);
  }

  verifyLists(bloques : Array<CitaMedica>, citas : Array<CitaMedica>){
    console.log('DFO: en verifyLists')
    let preLista : Array<CitaMedica> = [];
    if(citas.length>0){
      bloques.forEach(bloq => {
        citas.forEach(cita => {
          let bloqValues = Object.values(bloq);
          let citaValues = Object.values(cita);
          let bloqOb = {
            mes : bloqValues[0],
            dia : bloqValues[1],
            anno : bloqValues[2],
            hora : bloqValues[3] + ":00"
          }
          let citaOb = {
            mes : citaValues[0],
            dia : citaValues[1],
            anno : citaValues[2],
            hora : citaValues[3]
          }
          //console.log('DFO: citaOb dia:'+citaOb.dia+' mes:'+citaOb.mes+' hora:'+citaOb.hora);
          //console.log('DFO: bloqOb dia:'+bloqOb.dia+' mes:'+bloqOb.mes+' hora:'+bloqOb.hora);
          if(citaOb.hora != bloqOb.hora && citaOb.mes == bloqOb.mes && citaOb.dia == bloqOb.dia && citaOb.anno == bloqOb.anno){
            //console.log('DFO: empujando a prelista')
            // lo que hace es comparar las horas de cada cita por día
            preLista.push(bloq)
          }
          // if(bloqValues[0] != citaValues[0] && bloqValues[1] != citaValues[1] && bloqValues[2] != citaValues[2] && bloqValues[3] != citaValues[3]){
          //   console.log('DFO: verifyLists : no existe una coincidencia');
          //   preLista.push(bloq)
          // }
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
        this.stroage.remove('agenda'+this.medicObj.numrunMedico) // elimina la lista de agendas del medico para que la cache no la intente volver a sumar
        this.stroage.remove('citas'+this.medicObj.numrunMedico) // elimina la lista de citas medicas del doctor para que la cache no la intente volver a llenar
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
}
