import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { SignupForm } from './signup.page.form';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
signupForm = this.formBuilder.group({
  firstName : ['', [Validators.required, Validators.pattern('[\p{L} ]*')]],
  lastName : ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
  run : ['', [Validators.required]],
  email : ['', [Validators.required, Validators.email]],
  phone : ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(9)]],
  pw1 : ['', [Validators.required, Validators.minLength(8)]],
  pw2 : ['', [Validators.required, Validators.minLength(8)]]
})
signForm : any;

  constructor(private formBuilder : FormBuilder, private router : Router, private alertController : AlertController) { }

  ngOnInit() {
    this.signForm = new SignupForm(this.formBuilder).createForm();
  }
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
  submit(){
    this.confirmAlert();
  }
}
