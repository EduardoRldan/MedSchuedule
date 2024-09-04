import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page-medic',
  templateUrl: './main-page-medic.page.html',
  styleUrls: ['./main-page-medic.page.scss'],
})
export class MainPageMedicPage implements OnInit {
  date : number = Date.now();
  todayAgenda : any = [];  // almacena la lista de consultas solo del día
  constructor() { }

  ngOnInit() {
  }

}
