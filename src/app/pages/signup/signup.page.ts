import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { SignupForm } from './signup.page.form';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
// signupForm = this.formBuilder.group({
//   firstName : ['', [Validators.required, Validators.pattern('[\p{L} ]*')]],
//   lastName : ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
//   run : ['', [Validators.required]],
//   email : ['', [Validators.required, Validators.email]],
//   phone : ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(9)]],
//   pw1 : ['', [Validators.required, Validators.minLength(8)]],
//   pw2 : ['', [Validators.required, Validators.minLength(8)]]
// })
signForm! : FormGroup;

  constructor(
    private formBuilder : FormBuilder, 
    private router : Router, 
    private alertController : AlertController,
    private bd : ServicebdService) { }

  ngOnInit() {
    this.signForm = new SignupForm(this.formBuilder).createForm();
  }

  // probablemente haya que cambiarla
  async confirmAlert(){
    const alert = await this.alertController.create({
      header : 'Registro con éxito',
      message : 'Recibirá un correo para confirmar su registro',
      buttons : [{
        text : 'Aceptar',
        role : 'confirm',
        handler : () =>{
          this.router.navigate(['/main-login']);
        }
      }]
    });
    await alert.present();
  }
  async submit(){
    if (this.signForm.valid) {
      const values = Object.values(this.signForm.value);
      // esto se mandará al usuario
      // 0-3 nombre completo
      // 6  tel
      // let userObj = {
      //   email : values[5],
      //   pw : values[7],
      //   active : 1,
      //   fotoPerfil : {},
      //   idRole : 1
      // };
      // let rut : string = values[4] as string;
      // let splitRun = rut.split('-')
      // let patientObj = {
      //   numrun : parseInt(splitRun[0]),
      //   dvrun : splitRun[1],
      //   pnombre : values[0],
      //   snombre : values[1],
      //   apaterno : values[2],
      //   amaterno : values[3],
      //   tel : values[6],

      // }
      await this.bd.createUser(values)
      .then((res)=> {
        console.log(JSON.stringify(res))
        this.confirmAlert();
      })
    }
  }
}
