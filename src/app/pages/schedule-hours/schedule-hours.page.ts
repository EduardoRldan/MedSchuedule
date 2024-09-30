import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodayDateService } from 'src/app/services/today-date.service';

@Component({
  selector: 'app-schedule-hours',
  templateUrl: './schedule-hours.page.html',
  styleUrls: ['./schedule-hours.page.scss'],
})
export class ScheduleHoursPage implements OnInit {
setHours : any = [];
hideList : boolean = true;
defDate : string = "";
selectedDate : any;
hrsFound : boolean = false; // boolean, si es verdadero mostrará la lista, si es falso lanzará un mensaje de error
  constructor(private router : Router, private activatedroute : ActivatedRoute, private today : TodayDateService) {
    // este bloque ya no será necesario al implementar NativeStorage
    this.activatedroute.queryParams.subscribe( param => {
      if (this.router.getCurrentNavigation()?.extras.state){
        if (this.router.getCurrentNavigation()?.extras?.state?.['list']){
          this.setHours = this.router.getCurrentNavigation()?.extras?.state?.['list']
        }}});
    //
    this.defDate = this.today.todayDate();
  }

  ngOnInit() {
    this.defDate = this.today.todayDate();
    this.selectedDate = this.defDate + "T00:00:00"; // necesario agregar la ultima linea debido a como se creará el filtro
    this.hideList = false; // posiblemente no sea necesaria esta variable
    this.showScheduledHrs(this.selectedDate); // al abrir se iniciará esta función, mostrará de inmediato la lista de agendas
  }
  showScheduledHrs(date : string){
    const dateList = this.today.splitDate(date);
    // funcion que muestra la lista de horas según la fecha seleccionada
    // debe tener una condicional en la que si no encuentra una cita en la lista renderice un mensaje vacío
  }
}
