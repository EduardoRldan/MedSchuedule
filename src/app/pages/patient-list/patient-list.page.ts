import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivationStart, NavigationExtras, Router, RouterOutlet } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { Medic } from 'src/app/classes/medic';
import { ObjectHandlerService } from 'src/app/services/object-handler.service';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { TodayDateService } from 'src/app/services/today-date.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.page.html',
  styleUrls: ['./patient-list.page.scss'],
})
export class PatientListPage implements OnInit {
  medicLogged! : Medic;
  patientList : any = [];
  filteredList : any = [];
  selectedPatient : any;  // probablemente no lo use
  defDate : string = "";
  selectedDate : string = ""
  selectedEstado! : number;
  hideList : boolean = true;
  
  constructor(
    private router:Router, 
    private today : TodayDateService,
    private storage : NativeStorage,
    private handler : ObjectHandlerService,
    private bd : ServicebdService) { 
      this.loadData()
    }

  ngOnInit() {

    this.defDate = this.today.todayDate();
  }

  ionViewWillEnter(){
    this.loadData();
  }

  ionViewDidLeave(){
    this.hideList = false;
  }

  showPatientList(date : string){
    this.filterList(date)
    this.hideList = false;
  }

  async loadData(){
    this.defDate = this.today.todayDate();
    this.selectedDate = this.defDate;
    await this.storage.getItem('medicLogged')
    .then(async (data) =>{
      this.medicLogged = this.handler.createMedicObject(JSON.parse(data))
      await this.getCitas(this.medicLogged.numrunMedico);
    }).catch(e => console.log('DFO: Error obteniendo medico '+JSON.stringify(e)))
  }

  stateVal(id : number){
    const stateList = ['Activo', 'Cancelado', 'Finalizado'];
    return stateList[id-1];
  }

  async getCitas(run : number){
    console.log('DFO: obteniendo citas medicas');
    await this.bd.getCitasMedicasPaciente(run)
    .then(async () =>{
      await this.storage.getItem('citasMedico'+run)
      .then((data) =>{
        let pacientes = Object.values(data);
        this.patientList = pacientes;
      }).catch(e => console.log('DFO: error obteniendo lista de pacientes '+JSON.stringify(e)))
    })
  }

  filterListByDate(date : string){
    // funcion que permitirá filtrar los resultados de la lista de pacientes por fecha
    // toma el valor de la fecha seleccionada en el calendario, la divide por año mes y dia
    // recorrerá la lista de pacientes que será poblada antes a través de una consulta por SQL
    // la lista no se actualizará constantemente, solo si el usuario sale de la plantilla
    // o crear un método de recarga
  }

  filterList(fecha : string, estado? : number){
    console.log('DFO: filtrando lista')
    let splitDate = this.today.splitDate(fecha);
    const mes = splitDate[1];
    const anno = splitDate[0];
    const dia = splitDate[2];
    // filtra la lista de pacientes solicitando la fecha, puede tambien filtrar con el estado segun se indique
    console.log('DFO: filtrando lista con estado '+estado)
    const result = this.patientList.filter((hora : any) => {
      
      if(estado){
        return hora.estado == estado && hora.mes == mes && hora.anno == anno && hora.dia == dia;
      } else {
        return hora.mes == mes && hora.anno == anno && hora.dia == dia;
      }
    })
    this.filteredList = result;
  }

  async goToPatient(patient : any){
    await this.storage.setItem('selectedPatient',patient)
    .then(() =>{
      this.router.navigate(['/tab-medico/patient-config'])
    })
    
  }
}
