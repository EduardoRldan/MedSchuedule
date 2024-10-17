import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';
import { User } from 'src/app/classes/user';
import { ObjectHandlerService } from 'src/app/services/object-handler.service';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.page.html',
  styleUrls: ['./users-list.page.scss'],
})
export class UsersListPage implements OnInit {
  usersList! : Array<User>
  filteredList! : Array<User>;
  userLogged! : User;
  selectRole : number = 0;
  constructor(
    private bd : ServicebdService, 
    private storage : NativeStorage, 
    private handler : ObjectHandlerService, 
    private alertController : AlertController,
    private router : Router) { }

  ngOnInit() {
    this.loadData()
  }

  ionViewWillEnter(){
    this.loadData()
  }

  ionViewDidLeave(){
    this.selectRole = 0;
  }

  async loadData(){
    await this.storage.getItem('userLogged')
    .then(async (data) => {
      this.userLogged = this.handler.createUserObject(data);
      await this.bd.getAllUsersObj().subscribe( data => {
        this.usersList = data;
        this.filteredList = data;
      }, e => console.log('DFO: error al obtener usuarios de BD '+JSON.stringify(e)))
    })
  }

  filterList(roleValue : number){
    console.log('DFO: roleValue '+roleValue)
    const filter = this.usersList.filter((obj : User) =>{
      console.log('DFO: '+obj.idRole)
      return obj.idRole == roleValue
    })
    this.filteredList = filter
  }

  async updateActive(idUser : number, newVal : number){
    await this.bd.updateActive(idUser,newVal)
    .then(() => {
      this.router.navigate(['/tab-admin/main-admin-page'])
    })
  }

  async confirmAlert(idUser : number, newVal : number){
    let title = "";
    let msj = "";
    if(newVal == 1){
      title = "Activar Usuario"
      msj = "¿Desea activar a este usuario?"
    }
    if(newVal == 0){
      title = "Desactivar Usuario"
      msj = "¿Desea desactivar a este usuario"
    }
    const alert = await this.alertController.create(
      {
        header : title,
        subHeader : msj,
        message : '',
        buttons : [{
          text : "Cancelar",
          role : 'cancel'
        },
        {
          text : "Confirmar",
          role : "confirm",
          handler : ()=>{
            this.updateActive(idUser, newVal)
          }
        }]
      });
    await alert.present();
  }
}
