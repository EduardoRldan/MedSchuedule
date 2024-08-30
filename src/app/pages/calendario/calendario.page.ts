import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {
  medicObj : any;
  today = new Date(Date.now())
  year = this.today.getFullYear();
  month = this.today.getMonth() + 1;  // estrictamente necesario que sume uno más al mes
  day = this.today.getDate();
  minDate : string = "";  //define la fecha en que inicia el calendario
  maxDate : string = "";  //define la fecha de corte del calendario
  selectedDate : any;     //mantiene la fecha seleccionada
  hourList : any = [];
  
  constructor(private router:Router, private activatedroute:ActivatedRoute) { 
    this.activatedroute.queryParams.subscribe( param => {
      if(this.router.getCurrentNavigation()?.extras.state){
        this.medicObj = this.router.getCurrentNavigation()?.extras?.state?.['medicObj'];
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
  }

  testFn(){
    console.log(this.selectedDate)
  }
  populateHourList(selDate : string, range : number, startHr : string){
    let dateSelected = selDate.substring(0,10);
    let hourFormat = startHr + ":00.000Z";
    let formattedDate = new Date('2023-01-22T13:30:00.000Z');
    console.log(formattedDate)
    for (let i = 0; i<range;i++){
      this.hourList.push({
        fecha : "",
        paciente : ""
      })
    }
    
  }

  //createHourBlocks(){
    // primero debo crear una lista vacía
    // según la cantidad de rango de horas esa lista se poblará
    // usando la hora de inicio puedo determinar la hora que tendrán los bloques
  //  let rango = this.medicObj.rango;
  //  let hourBlocks : any = []
  //  for (let i = 0; i < rango; i++){
  //    hourBlocks.push(
  //      {
  //        hora : 
  //      }
  //    )
  //  }
  //}
}
