// TodayDateService
// contiene una función que devuelve la fecha del día a través de un string

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodayDateService {

  constructor() { }
  todayDate(){
    const defDate= new Date(Date.now());
    const year = defDate.getFullYear();
    const month = defDate.getMonth()+1;
    const day = defDate.getDate();

    let yearToStr = year.toString();
    let monthToStr = "";
    if (month < 10) {
      monthToStr = "0" + month.toString();
    } else {
      monthToStr = month.toString();
    }
    let dayToStr = "";
    if (day < 10) {
      dayToStr = "0"+day.toString();
    } else {
      dayToStr = day.toString()
    }
    const dateToStr = yearToStr + "-" + monthToStr + "-" + dayToStr;
    return dateToStr;
  }

  tomorrowDate(){
    const defDate= new Date(Date.now());
    const year = defDate.getFullYear();
    const month = defDate.getMonth()+1;
    const day = defDate.getDate() +1;

    let yearToStr = year.toString();
    let monthToStr = "";
    if (month < 10) {
      monthToStr = "0" + month.toString();
    } else {
      monthToStr = month.toString();
    }
    let dayToStr = "";
    if (day < 10) {
      dayToStr = "0"+day.toString();
    } else {
      dayToStr = day.toString()
    }
    const dateToStr = yearToStr + "-" + monthToStr + "-" + dayToStr;
    return dateToStr;
  }

  splitDate(strDateISOFormat : string){
    // Convierte cualquier fecha escrita en formato ISO 8601 en una cadena dividida por año, mes y dia en ese orden
    // no toma las horas
    const strDate = strDateISOFormat.substring(0,10).split('-');
    return strDate
  }
}
