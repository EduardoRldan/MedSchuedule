import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
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
  medList : any = [];

  selectedId : string = "";

  filteredList : any;
  constructor(private router:Router, private activatedroute : ActivatedRoute, private bd : ServicebdService, private storage : NativeStorage) {
    
    // this.activatedroute.queryParams.subscribe( param => {
    //   if (this.router.getCurrentNavigation()?.extras.state) {
    //     this.user = this.router.getCurrentNavigation()?.extras?.state?.['user']
    //   }
    // })
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
          this.especialidades.push(medVal[3]);
          console.log('DFO: Llenando lista de especialidades: '+medVal[3])
        }
      })
    })
  }

  filterBySpeciality(speciality:string) {
    let list = this.medList;
    const result = list.filter((obj: any) =>{
      return obj.espId === parseInt(speciality);
    });
    this.filteredList = result;
  }

  filterByName(name:string) {
    let list = this.medList;
    const result = list.filter((obj:any) => {
      return obj.nombre.toLowerCase().includes(name.toLowerCase());
    });
    this.filteredList = result;
  }

  redirect(medicObj:any) {
    let navigationextras : NavigationExtras = {
      state : {
        medicObj : medicObj,
        user : this.user
      }
    }
    this.router.navigate(['/calendario'], navigationextras)
  }
}
