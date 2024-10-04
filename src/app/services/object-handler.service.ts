import { Injectable } from '@angular/core';
import { User } from '../classes/user';
import { Medic } from '../classes/medic';
import { Paciente } from '../classes/paciente';

@Injectable({
  providedIn: 'root'
})
export class ObjectHandlerService {

  constructor() { }

  createUserObject(userData : string){
    // Permite crear un objecto de tipo User utilizando datos escritos en formato JSON
    // parsea los datos a un objeto y luego los desestructura en valores que serán convertidos en un objeto de User
    // luego retorna ese objeto
    const data = JSON.parse(userData);
    const values = Object.values(data);

    let idUser = values[0] as number;
    let email = values[1] as string;
    let active = values[2] as number;
    let fotoPerfil = values[3] as object;
    let idRole = values[4] as number;
  
    return new User(idUser, email, active, fotoPerfil, idRole);
  }

  createMedicObject(medicData : object){
    console.log('creando objeto Medico')
    const values = Object.values(medicData);
    try{
      console.log('Datos validos')
      let numrun = values[0] as number;
      let dvrun = values[1] as string;
      let pnombre = values[2] as string;
      let snombre = values[3] as string;
      let apaterno = values[4] as string;
      let amaterno = values[5] as string;
      let tel = values[6] as number;
      let box = values[7] as string;
      let tiempoBloque = values[8] as number;
      let idEsp = values[9] as number;
      let idUser = values[10] as number;
  
      return new Medic(numrun, dvrun, pnombre, snombre, apaterno, amaterno, tel, box, tiempoBloque, idEsp, idUser); 
    } catch(error){
      console.log("DFO: Error creando medico: " + JSON.stringify(error));
      return new Medic(1, '1','error','error','error','error',1,'error',1,1,1);
    }
  }

  createPatientObject(patientData : object){
    console.log('DFO: creando objeto Paciente');
    const values = Object.values(patientData);
    try{
      let numrun = values[0] as number;
      let dvrun = values[1] as string;
      let pnombre = values[2] as string;
      let snombre = values[3] as string;
      let apaterno = values[4] as string;
      let amaterno = values[5] as string;
      let tel = values[6] as number;
      let idUser = values[7] as number;

      return new Paciente(
        numrun,
        dvrun,
        pnombre,
        snombre,
        apaterno,
        amaterno,
        tel,
        idUser
      )
    } catch(error) {
      console.log('DFO: Error creando paciente: '+ JSON.stringify(error))
      return new Paciente(1,"1","error", "error","error","error",1,-1)
    }
    

  }
}
