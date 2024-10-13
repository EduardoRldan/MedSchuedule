import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RutVerifyService {

  constructor() { }

  verify(numeros : number, dv : string){
    const strNum : string = numeros.toString();
    const invNum = strNum.split("").reverse();
    const factor = [2,3,4,5,6,7]
    let x = 0
    let sumatoria = 0;
    for (let i = 0; i<invNum.length;i++){
      sumatoria+= parseInt(invNum[i]) * factor[x]
      x+=1
      if(x>5){x=0};
    }
    const mult = (Math.trunc(sumatoria/11))*11;
    const resta = sumatoria - mult;
    const resultado = 11 - resta;
    console.log(resultado);
    let dvAVerificar;
    if (dv.toLowerCase() === 'k'){
      dvAVerificar = 10
    } else if (dv === '0'){
      dvAVerificar = 11
    } else {
      dvAVerificar = parseInt(dv);
    }

    return resultado == dvAVerificar
  }

  splitRut(rut : string) : Array<string>{
    return rut.split('-');
  }
}
