import { Component, OnInit } from '@angular/core';
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

}
