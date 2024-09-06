import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.page.html',
  styleUrls: ['./patient-list.page.scss'],
})
export class PatientListPage implements OnInit {
  patientList : any = [1];
  selectedPatient : any;
  constructor(private router:Router) { }

  ngOnInit() {
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
