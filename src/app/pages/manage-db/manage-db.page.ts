import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';
import { User } from 'src/app/classes/user';
import { AlerttoastService } from 'src/app/services/alerttoast.service';
import { ObjectHandlerService } from 'src/app/services/object-handler.service';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-manage-db',
  templateUrl: './manage-db.page.html',
  styleUrls: ['./manage-db.page.scss'],
})
export class ManageDbPage implements OnInit {
  userLogged! : User;
  especialidadesList : any = [];
  logTypeList : any = [];
  annoTrimestreList : any = [];

  // inputs
  espInput : string = "";
  typeInput : string = "";
  annoInput : number = 0;
  trimestreInput : number = 0;
  constructor(
    private storage : NativeStorage, 
    private handler : ObjectHandlerService, 
    private bd : ServicebdService, 
    private router : Router,
    private alertController : AlertController,
    private toast : AlerttoastService) { }

  ngOnInit() {
    this.loadData();
  }

  ionViewWillEnter(){
    this.loadData()
  }

  ionViewDidLeave(){
    this.espInput = ""
    this.typeInput = ""
    this.annoInput = 0;
    this.trimestreInput = 0;
  }

  async loadData(){
    await this.storage.getItem('userLogged')
    .then(data => {
      this.userLogged = this.handler.createUserObject(data);
      this.bd.getSpecialities().subscribe(data => {
        this.especialidadesList = data;
      }, e => console.log('DFO error al obtener especialidades desde bd '+JSON.stringify(e)))
      
      this.bd.getLogType().subscribe(data => {
        this.logTypeList = data;
        console.log('DFO logtype: '+ data)
      }, e => console.log('DFO: error obteniendo log_type '+JSON.stringify(e)))

      this.bd.getListAnnoTrimestre().subscribe(data => {
        this.annoTrimestreList = data;
        console.log('DFO: anno '+data)
      }, e => console.log('DFO: error al obtener lista anno '+JSON.stringify(e)))
    })
  }
  selectTrimestre(event: any){
    this.trimestreInput = event.detail.value;
  }

  async addValues(input : string, table : number){
    await this.bd.insertNewValues(table,input)
    .then(() => {
      this.loadData()
    })
  }

  async deleteValues(id: number, table: number){
    await this.bd.deleteValues(table,id)
    .then(() => {
      this.loadData()
    })
  }

  async insertNewAnno(anno : number, trimestre : number){
    // el año se ingresa como inactivo, hay que activarlo en el panel
    const date = new Date(Date.now())
    if(anno>=date.getFullYear()){
      await this.bd.newAnnoTrimestre(anno, trimestre)
      .then(() =>{
        this.loadData()
      })
    } else {
      this.toast.presentToast('El año no puede ser menor al año vigente')
    }
    
  }

  async annoStatUpdate(status : number, id: number){
    await this.bd.updateStatAnnoTrimestre(id, status)
    .then(() => {
      this.loadData();
    })
  }

  async confirmUpdate(stat : number, id:number){
    let title = "";
    let msj = "";
    let subMsj = "";
    if(stat==1){
      title = "Activar Año-Trimestre"
      msj = "¿Desea activar este año y trimestre?"
      subMsj = "Al activar esta entrada los médicos podrán crear agendas para sus pacientes en los meses correspondientes al trimestre."
    }
    if(stat==0){
      title = "Desactivar Año-Trimestre"
      msj = "¿Desea desactivar este año y trimestre?"
      subMsj = "Al desactivar esta entrada los médicos no podrán registrar nuevas agendas, pero los pacientes aún pueden crear nuevas citas."
    }
    const alert = await this.alertController.create(
      {
        header : title,
        subHeader : msj,
        message : subMsj,
        buttons : [{
          text : "Cancelar",
          role : 'cancel'
        },
        {
          text : "Confirmar",
          role : "confirm",
          handler : ()=>{
            this.annoStatUpdate(stat, id)
          }
        }]
      });
    await alert.present();
  }

  async confirmDelete(id : number, table : number){
    const alert = await this.alertController.create(
      {
        header : "Eliminar Entrada",
        subHeader : "¿Está seguro de eliminar esta entrada?",
        message : 'Al eliminar una entrada podrían verse afectadas otras tablas. Si elimina una especialidad, asegurese de que ningun médico esté asociada a ella',
        buttons : [{
          text : "Cancelar",
          role : 'cancel'
        },
        {
          text : "Confirmar",
          role : "confirm",
          handler : ()=>{
            this.deleteValues(id, table)
          }
        }]
      });
    await alert.present();
  }
}
