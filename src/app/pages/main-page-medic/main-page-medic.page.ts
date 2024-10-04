import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ActivationStart, Router, RouterOutlet } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { Medic } from 'src/app/classes/medic';
import { User } from 'src/app/classes/user';
import { ObjectHandlerService } from 'src/app/services/object-handler.service';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-main-page-medic',
  templateUrl: './main-page-medic.page.html',
  styleUrls: ['./main-page-medic.page.scss'],
})
export class MainPageMedicPage implements OnInit {
  
  date : number = Date.now();
  todayAgenda : any = [];  // almacena la lista de consultas solo del día
  userLogged! : User;
  medicLogged! : Medic;
  constructor(private storage : NativeStorage, 
    private handler : ObjectHandlerService, 
    private bd : ServicebdService, 
    private router : Router,
    private route : ActivatedRoute) { }

  ngOnInit() {
    this.storage.getItem('userLogged').then((data) =>{
      console.log("Usuario logueado")
      this.userLogged = this.handler.createUserObject(data);
      let idUs = this.userLogged.idUser;
      this.bd.getMedic(idUs)
      .then(()=> {
        this.storage.getItem('medicLogged')
        .then((data)=>{
          console.log('Medico encontrado')
          this.medicLogged = this.handler.createMedicObject(JSON.parse(data))
          console.log(this.medicLogged.pnombreMedico);
        })
      })
    });
  }

  irAPacientes(){
    if (this.router.url !== '/tab-medico/patient-list'){
      this.router.navigate(['/tab-medico/patient-list'], {replaceUrl : true})
    }
    
  }
}
