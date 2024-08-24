import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  Apellido: string="";
  edad : number = 0;
  Persona : any;
   //Subscribirse al observable/Promesa
  constructor(private router: Router, private activedrouter: ActivatedRoute) {
    this.activedrouter.queryParams.subscribe((param) =>{});
    //Verificar si viene la variable de contexto
    if(this.router.getCurrentNavigation()?.extras.state){
      //Verificar y guardar los datos
      this.Persona = this.router.getCurrentNavigation()?.extras.state?.['pers'];

      this.Persona = this.router.getCurrentNavigation()?.extras.state?.['apellido'];

      this.Persona = this.router.getCurrentNavigation()?.extras.state?.['ed'];
    }
  }
   
    
  ngOnInit() {
  }

}
