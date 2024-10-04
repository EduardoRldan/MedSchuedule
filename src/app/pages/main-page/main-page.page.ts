import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { Paciente } from 'src/app/classes/paciente';
import { User } from 'src/app/classes/user';
import { ObjectHandlerService } from 'src/app/services/object-handler.service';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.page.html',
  styleUrls: ['./main-page.page.scss'],
})
export class MainPagePage implements OnInit {
  date : number = Date.now();
  userLogged! : User;
  patientLogged! : Paciente;
  setHours : any = [];
  constructor(private storage : NativeStorage, private router:Router, private activatedroute : ActivatedRoute, private handler : ObjectHandlerService, 
    private bd : ServicebdService) { 
    this.getuser();
  }

  ngOnInit() {
    //this.getSchedule(this.patientLogged.numrunPaciente)
  }

  async getSchedule(run : number){
    console.log("DFO: Obteniendo citas medicas")
    this.setHours = await this.bd.getScheduledHrs(run, 1);
  }
  async getuser(){
    await this.storage.getItem('userLogged').then(async (data) => {
      this.userLogged = this.handler.createUserObject(data);
      let idUs = this.userLogged.idUser;
      await this.bd.getPaciente(idUs)
      .then(async () =>{
        await this.storage.getItem('patientLogged')
        .then(async (data) => {
          console.log('DFO: paciente encontrado');
          this.patientLogged = this.handler.createPatientObject(JSON.parse(data))
          await this.getSchedule(this.patientLogged.numrunPaciente)
          console.log('DFO: paciente listo')
          })
        })
      })
    }
  }

  // goToPage(route:string){
  //   let navExtras : NavigationExtras = {
  //     state : {
  //       user : this.user
  //     }
  //   }
  //   this.router.navigate([route],navExtras);
  // }

//   goToSchedule(route : string,hourList : any){
//     let navExtras : NavigationExtras = {
//       state : {
//         list : hourList
//       }
//     }
//     this.router.navigate([route],navExtras);
//   }
// }
