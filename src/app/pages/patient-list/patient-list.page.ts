import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivationStart, NavigationExtras, Router, RouterOutlet } from '@angular/router';
import { TodayDateService } from 'src/app/services/today-date.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.page.html',
  styleUrls: ['./patient-list.page.scss'],
})
export class PatientListPage implements OnInit {
  patientList : any = [1];
  selectedPatient : any;
  defDate : string = "";
  selectedDate : string = ""
  constructor(private router:Router, private today : TodayDateService) { }

  ngOnInit() {

    this.defDate = this.today.todayDate();
  }
  showPatientList(){
    return
  }
  filterListByDate(date : string){
    // funcion que permitirá filtrar los resultados de la lista de pacientes por fecha
    // toma el valor de la fecha seleccionada en el calendario, la divide por año mes y dia
    // recorrerá la lista de pacientes que será poblada antes a través de una consulta por SQL
    // la lista no se actualizará constantemente, solo si el usuario sale de la plantilla
    // o crear un método de recarga
  }
  goToPatient(page : string, patient : any){
    let navExtras : NavigationExtras = {
      state : {
        patient : patient
      }
    }
    this.router.navigate([page], navExtras)
  }
}
