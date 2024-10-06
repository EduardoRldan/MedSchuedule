import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { EncoderService } from 'src/app/services/encoder.service';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-pagina-busqueda',
  templateUrl: './pagina-busqueda.page.html',
  styleUrls: ['./pagina-busqueda.page.scss'],
})
export class PaginaBusquedaPage implements OnInit {
  user : any;
  filterSelect : string = "";
  filterName : string = "";
  // Se construye por el momento una lista de médicos que debe incluir los siguientes argumentos
  // Nombre, Especialidad, rango de duración de cada bloque (en minutos), hora de inicio, hora de termino
  especialidades : any = [];

  // los objetos almacenados en esta lista contienen las siguientes claves: numrunMedico, dvrunMedico, nombreMedico, especialidad
  medList : any = [];

  selectedId : string = "";

  filteredList : any;
  constructor(
    private router:Router, 
    private activatedroute : ActivatedRoute, 
    private bd : ServicebdService, 
    private storage : NativeStorage) {
    
  }

  ngOnInit() {
    this.getMedicList();
  }
  
  async getMedicList(){
    await this.bd.getAllMedics()
    .then(async () => {
      await this.storage.getItem('medicos')
      .then((res) => {
        console.log('DFO: que tiene res '+JSON.stringify(res));
        this.medList = Object.values(res);
        for (let i = 0;i<this.medList.length;i++){
          let medic = this.medList[i]
          let medVal = Object.values(medic);
          let especialidad = 
          {
            id : 0,
            nomEsp : ""
          }
          if (especialidad.id != medVal[3]){
            console.log('DFO: nomesp: '+ medVal[4])
            especialidad = 
            {
              id : medVal[3] as number,
              nomEsp : medVal[4] as string
            }
            this.especialidades.push(especialidad)
          }
          console.log('DFO: Llenando lista de especialidades: '+medVal[3])
        }
      })
    })
  }

  filterBySpeciality(speciality:string) {
    console.log(speciality);
    let list = this.medList;
    const result = list.filter((obj: any) =>{
      return obj.idEsp === parseInt(speciality);
    });
    this.filteredList = result;
  }

  filterByName(name:string) {
    let list = this.medList;
    const result = list.filter((obj:any) => {
      return obj.nombreMedico.toLowerCase().includes(name.toLowerCase());
    });
    this.filteredList = result;
  }

  redirect(medicObj:any) {
    let navigationextras : NavigationExtras = {
      state : {
        medicObj : medicObj
      }
    }
    this.router.navigate(['/tab-paciente/calendario'], navigationextras)
  }
}
