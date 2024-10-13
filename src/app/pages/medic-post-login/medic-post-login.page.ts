import { Component, OnInit } from '@angular/core';
import { LocalNotifications, ScheduleOptions } from '@capacitor/local-notifications';
import { RutVerifyService } from 'src/app/services/rut-verify.service';

@Component({
  selector: 'app-medic-post-login',
  templateUrl: './medic-post-login.page.html',
  styleUrls: ['./medic-post-login.page.scss'],
})
export class MedicPostLoginPage implements OnInit {
  rut : string = "";
  constructor(private ver : RutVerifyService) { }

  ngOnInit() {
  }

  verificar(rut : string){
    const rutSplit = rut.split('-');
    console.log(this.ver.verify(parseInt(rutSplit[0]),rutSplit[1]))
  }
  

  async scheduleNotification(){
    await LocalNotifications.requestPermissions()
    let options : ScheduleOptions ={
      notifications : [
        {
          id:1,
          title : "Ejemplo",
          body : "Este una notificacion de ejemplo",
          largeBody : "Esta es una notificación de ejemplo donde habrá textos y cosas así",
          summaryText : "Es un ejemplo"
        }
      ]
    }
    try{
      await LocalNotifications.schedule(options)
    } catch(e) {

    }
    
  }

}
