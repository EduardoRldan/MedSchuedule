import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { EncoderService } from 'src/app/services/encoder.service';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-cita-details',
  templateUrl: './cita-details.page.html',
  styleUrls: ['./cita-details.page.scss'],
})
export class CitaDetailsPage implements OnInit {
  cita : any = {
    mes : 0,
    dia : 0,
    anno : 0,
    hora : "",
    nombreMedico : "",
    numrunMedico : 0,
    dvrun : "",
    especialidad : "",
    box : "",
    estado : 0
  }
  loadReady : boolean = false;
  constructor(
    private storage : NativeStorage,
    private bd : ServicebdService,
    private ec : EncoderService
  ) { 
    this.loadData()
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.loadData()
  }

  ionViewDidLeave(){
    this.loadReady = false;
  }
  consultaTest(){
    console.log('DFO: fecha '+this.cita.anno+'/'+this.cita.mes+'/'+this.cita.dia)
  }

  async loadData(){
    await this.storage.getItem('citaSelected')
    .then((data) =>{
      let sch = Object.values(data)
      console.log('DFO: mes '+sch[0]+' dia '+sch[1])
      let nomEncode = this.ec.convertStringUTF8(sch[4] as string)
      let espEncode = this.ec.convertStringUTF8(sch[8] as string)
      this.cita = {
        mes : sch[0],
        dia : sch[1],
        anno : sch[2],
        hora : sch[3],
        nombreMedico : nomEncode,
        numrunMedico : sch[5],
        dvrun : sch[6],
        especialidad : espEncode,
        box : sch[7],
        estado : sch[9]
      };
      this.loadReady = true;
    }).catch(e =>{
      console.log('DFO: error encontrando cita '+JSON.stringify(e))
    })
  }

}
