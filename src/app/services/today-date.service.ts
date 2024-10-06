// TodayDateService
// contiene una función que devuelve la fecha del día a través de un string

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodayDateService {

  constructor() { }
  todayDate(){
    // Muestra la fecha de hoy en formato string segun ISO 8601
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
    const dateToStr = yearToStr + "-" + monthToStr + "-" + dayToStr + "T00:00:00";
    return dateToStr;
  }

  tomorrowDate(){
    // Muestra la fecha de mañana en string en formato ISO 8601
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
    const dateToStr = yearToStr + "-" + monthToStr + "-" + dayToStr + "T00:00:00";
    return dateToStr;
  }

  splitDate(strDateISOFormat : string){
    // Convierte cualquier fecha escrita en formato ISO 8601 en una cadena dividida por año, mes y dia en ese orden
    // no toma las horas
    const strDate = strDateISOFormat.substring(0,10).split('-');
    return strDate
  }
  splitHour(strDateISOFormat : string){
    const strHour = strDateISOFormat.split('T');
    return strHour[1];
  }

  timeToSS(hr : string){
    // devuelve una hora en segundos
    const timeArr = hr.split(':')
    let hrMs = parseInt(timeArr[0]) * 3600;
    let minMs = parseInt(timeArr[1]) *60;
    let ssMs = parseInt(timeArr[2])
    return hrMs + minMs + ssMs
  }

  timeToMs(date : string){
    // convierte una fecha puesta en string en una cantidad de milisegundos
    const dateObj = new Date(date);
    const time = dateObj.getTime();
    return time;
  }


  parseTimeToStr(date : Date){
    const hour = date.getHours();
    const min = date.getMinutes();
    let minStr = min.toString();
    if (min < 10) {
      minStr = "0" + min.toString();
    }
    const hrStr = hour.toString() + ":" + minStr;
    return hrStr;
  }

  createMinBlocks(date1 : string, date2 : string, timeBlock : number){
    // toma dos fechas y las divide por el tamaño en minutos del bloque
    // devuelve la cantidad de bloques a crear
    const dateObj1 = new Date(date1)
    const dateObj2 = new Date(date2)
    const blocks = (dateObj2.getTime() - dateObj1.getTime()) / (timeBlock*60000);
    return blocks
  }

  todayIso(){
    return new Date(Date.now()).toISOString()
  }

  formatDate(date : string){
    const meses = ["Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre"
    ];
    const split = this.splitDate(date);
    let monthIdx = parseInt(split[1])
    let month = meses[monthIdx-1]
    return String(split[2] + " de "+ month + " de "+ split[0]);
  }
}
