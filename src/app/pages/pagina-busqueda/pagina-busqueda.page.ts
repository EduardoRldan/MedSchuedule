import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-pagina-busqueda',
  templateUrl: './pagina-busqueda.page.html',
  styleUrls: ['./pagina-busqueda.page.scss'],
})
export class PaginaBusquedaPage implements OnInit {

  filterSelect : string = "";
  filterName : string = "";
  // Se construye por el momento una lista de médicos que debe incluir los siguientes argumentos
  // Nombre, Especialidad, Rango de horas (expresado en numeros), hora de inicio, hora de termino
  medicList : any = [
    {
      id: 1,
      nombre: "Pedro Pérez Pereira",
      especialidad: "Kinesiología",
      espId : 2,
      rango: 5,
      horaInicio: "8:30",
      horaTermino:"13:30"
    },
    {
      id: 2,
      nombre: "Juan Cortés Cortés",
      especialidad: "Kinesiología",
      espId : 2,
      rango: 5,
      horaInicio: "8:30",
      horaTermino:"13:30"
    },
    {
      id: 3,
      nombre: "Roberto González Valenzuela",
      especialidad: "Geriatría",
      espId : 6,
      rango: 3,
      horaInicio: "10:00",
      horaTermino:"13:00"
    },
    {
      id: 4,
      nombre: "Valeria Martinez Madariaga",
      especialidad: "Medicina General",
      espId : 1,
      rango: 5,
      horaInicio: "8:30",
      horaTermino:"13:30"
    },
    {
      id: 5,
      nombre: "Elena Vásquez Muñoz",
      especialidad: "Oncología",
      espId : 5,
      rango: 5,
      horaInicio: "8:30",
      horaTermino:"13:30"
    },
  ]

  selectedId : string = "";

  filteredList : any;
  constructor(private router:Router) { }

  ngOnInit() {
  }
  
  filterBySpeciality(speciality:string) {
    let list = this.medicList;
    const result = list.filter((obj: any) =>{
      return obj.espId === parseInt(speciality);
    });
    this.filteredList = result;
  }

  filterByName(name:string) {
    let list = this.medicList;
    const result = list.filter((obj:any) => {
      return obj.nombre.toLowerCase().includes(name.toLowerCase());
    });
    this.filteredList = result;
  }

  redirect(medicObj:any) {
    let navigationextras : NavigationExtras = {
      state : {
        medicObj : medicObj
      }
    }
    this.router.navigate(['/calendario'], navigationextras)
  }

  testValue(value: any) {
    console.log(value)
  }
}
