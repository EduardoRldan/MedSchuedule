import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

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
  medList : any;
  medicList : any = [
    {
      id: 1,
      nombre: "Pedro Pérez Pereira",
      especialidad: "Kinesiología",
      espId : 2,
      rango: 15,
      horaInicio: "08:30",
      horaTermino:"13:30",
      fechaCierre : "2024-10-30"
    },
    {
      id: 2,
      nombre: "Juan Cortés Cortés",
      especialidad: "Kinesiología",
      espId : 2,
      rango: 15,
      horaInicio: "08:30",
      horaTermino:"13:30",
      fechaCierre : "2024-10-30"
    },
    {
      id: 3,
      nombre: "Roberto González Valenzuela",
      especialidad: "Geriatría",
      espId : 6,
      rango: 60,
      horaInicio: "10:00",
      horaTermino:"13:00",
      fechaCierre : "2024-10-30"
    },
    {
      id: 4,
      nombre: "Valeria Martinez Madariaga",
      especialidad: "Medicina General",
      espId : 1,
      rango: 30,
      horaInicio: "08:30",
      horaTermino:"13:30",
      fechaCierre : "2024-10-30"
    },
    {
      id: 5,
      nombre: "Elena Vásquez Muñoz",
      especialidad: "Oncología",
      espId : 5,
      rango: 30,
      horaInicio: "08:30",
      horaTermino:"13:30",
      fechaCierre : "2024-10-30"
    },
  ]

  selectedId : string = "";

  filteredList : any;
  constructor(private router:Router, private activatedroute : ActivatedRoute) { 
    this.activatedroute.queryParams.subscribe( param => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.user = this.router.getCurrentNavigation()?.extras?.state?.['user']
      }
    })
  }

  ngOnInit() {
    fetch('./assets/json/medicList.json')
    .then(res => res.json())
    .then(json => {
      this.medList = json;
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
    this.router.navigate(['/tab-paciente/calendario'], navigationextras)
  }
}
