import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-config',
  templateUrl: './patient-config.page.html',
  styleUrls: ['./patient-config.page.scss'],
})
export class PatientConfigPage implements OnInit {
  patient : any;
  constructor() { }

  ngOnInit() {
  }

}
