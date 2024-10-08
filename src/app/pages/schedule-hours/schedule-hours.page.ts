import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { Paciente } from 'src/app/classes/paciente';
import { ObjectHandlerService } from 'src/app/services/object-handler.service';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { TodayDateService } from 'src/app/services/today-date.service';

@Component({
  selector: 'app-schedule-hours',
  templateUrl: './schedule-hours.page.html',
  styleUrls: ['./schedule-hours.page.scss'],
})
export class ScheduleHoursPage implements OnInit {
patientLogged! : Paciente;
setHours : any = [];
filteredList : any = [];
hideList : boolean = true;
defDate : string = "";
selectedDate : any;
selectedEstado : number = 1;
hrsFound : boolean = false; // boolean, si es verdadero mostrará la lista, si es falso lanzará un mensaje de error
  constructor(
    private router : Router, 
    private activatedroute : ActivatedRoute, 
    private today : TodayDateService,
    private storage : NativeStorage,
    private handler : ObjectHandlerService,
    private bd : ServicebdService) {
    // este bloque ya no será necesario al implementar NativeStorage
    // this.activatedroute.queryParams.subscribe( param => {
    //   if (this.router.getCurrentNavigation()?.extras.state){
    //     if (this.router.getCurrentNavigation()?.extras?.state?.['list']){
    //       this.setHours = this.router.getCurrentNavigation()?.extras?.state?.['list']
    //     }}});
    //
    this.loadData();
    this.defDate = this.today.todayDate();
  }

  ngOnInit() {
    // this.defDate = this.today.todayDate();
    // this.selectedDate = this.defDate + "T00:00:00"; // necesario agregar la ultima linea debido a como se creará el filtro
    // this.hideList = false; // posiblemente no sea necesaria esta variable
    //this.showScheduledHrs(this.selectedDate); // al abrir se iniciará esta función, mostrará de inmediato la lista de agendas
  }

  ionViewWillEnter(){
    this.loadData();
  }

  async loadData(){
    await this.storage.getItem('patientLogged')
    .then(async (data) =>{
      this.patientLogged = this.handler.createPatientObject(JSON.parse(data))
      await this.getScheduleComplete(this.patientLogged.numrunPaciente)
    })
  }

  async getScheduleComplete(run :number){
    await this.bd.getAllCitasMedicasFromPaciente(run)
    .then(async () => {
      await this.storage.getItem('citasPaciente'+this.patientLogged.numrunPaciente)
      .then((data) =>{
        let schedule = Object.values(data);
        this.setHours = schedule;
        this.hrsFound = true;
        this.filterList(1);
      }).catch(e => {
        console.log('DFO: error obtiendo citas de storage: '+JSON.stringify(e))
        this.setHours = [];
      })
    }).catch(e => {
      console.log('DFO: error obteniendo citas del BD '+JSON.stringify(e))
    })
  }

  stateVal(id : number){
    const stateList = ['Activo', 'Cancelado', 'Finalizado'];
    return stateList[id-1];
  }

  filterList(estado : number){
    console.log('DFO: filtrando lista con estado '+estado)
    const result = this.setHours.filter((hora : any) => {
      return hora.estado == estado;
    })
    this.filteredList = result;
  }

  async showDetails(citaObj : any){
    console.log('DFO: redirigiendo')
    await this.storage.setItem('citaSelected',citaObj)
    .then(() => {
      this.router.navigate(['/tab-paciente/cita-details'])
    })
  }
}
