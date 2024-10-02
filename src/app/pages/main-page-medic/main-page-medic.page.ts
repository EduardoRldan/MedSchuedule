import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'app-main-page-medic',
  templateUrl: './main-page-medic.page.html',
  styleUrls: ['./main-page-medic.page.scss'],
})
export class MainPageMedicPage implements OnInit {
  date : number = Date.now();
  todayAgenda : any = [];  // almacena la lista de consultas solo del día
  userLogged! : User;
  constructor(private storage : NativeStorage) { }

  ngOnInit() {
    this.storage.getItem('userLogged').then((data) =>{
      let userData = JSON.parse(data);
      
    });
  }

}
