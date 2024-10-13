import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { Medic } from 'src/app/classes/medic';
import { User } from 'src/app/classes/user';
import { ObjectHandlerService } from 'src/app/services/object-handler.service';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { TodayDateService } from 'src/app/services/today-date.service';

@Component({
  selector: 'app-main-page-medic',
  templateUrl: './main-page-medic.page.html',
  styleUrls: ['./main-page-medic.page.scss'],
})
export class MainPageMedicPage implements OnInit {
  
  date : number = Date.now();
  agendaList : Array<object> = [];
  todayAgenda : any = [];  // almacena la lista de consultas solo del día
  userLogged! : User;
  medicLogged! : Medic;
  loadReady : boolean = false;

  constructor(
    private storage : NativeStorage, 
    private handler : ObjectHandlerService,
    private bd : ServicebdService,
    private today : TodayDateService) { }

  ngOnInit() {
    this.loadData();
  }

  ionViewWillEnter(){
    this.loadData();
  }

  async loadData(){
    await this.storage.getItem('userLogged').then((data) =>{
      //console.log("DFO: Usuario logueado")
      this.userLogged = this.handler.createUserObject(data);
      this.storage.getItem('medicLogged')
        .then((data)=>{
          //console.log('DFO: Medico encontrado')
          this.medicLogged = this.handler.createMedicObject(JSON.parse(data))
          this.bd.getCitasMedicasPaciente(this.medicLogged.numrunMedico)
          .then(() =>{
            this.storage.getItem('citasMedico'+this.medicLogged.numrunMedico)
            .then((data) =>{
              let list : Array<object> = Object.values(data);
              this.agendaList = list
              //console.log('DFO: largo citas'+list.length)
              this.filterAgendaForToday();
            }).catch(e => console.log('DFO: Error obteniendo citas de storage'+JSON.stringify(e)))
          }).catch(e => console.log('DFO: Error obteniendo citas' + JSON.stringify(e)))
          this.loadReady=true;
        }).catch(e => {
          console.log('DFO: Error obteniendo de storage'+ JSON.stringify(e))
        })
    });
  }

  filterAgendaForToday(){
    //console.log('DFO: consultando lista')
    const day = this.today.splitDate(this.today.todayDate());
    // let obj ={
    //   mes : 0,
    //   dia : 0,
    //   anno : 0,
    //   hora : "",
    //   estado : 0,
    //   numrunPaciente : 0,
    //   dvrunPaciente : "",
    //   nombrePaciente : "",
    //   telPaciente : 0,
    //   id : 0
    // }
    this.todayAgenda = this.agendaList.filter( (cita) => {
      console.log('DFO: citas')
      let val = Object.values(cita);
      return day[0] == val[2] && day[1] == val[0] && day[2] == val[1];
    })
  }
}
