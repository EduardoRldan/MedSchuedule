import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SignupForm } from './signup.page.form';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { AlertService } from 'src/app/services/alert.service';
///ESTA PAGINA ESTA TERMINADA, NO REALIZAR NINGUN CAMBIO
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

signForm! : FormGroup;

  constructor(
    private formBuilder : FormBuilder, 
    private bd : ServicebdService,
    private alert : AlertService) { }

  ngOnInit() {
    this.signForm = new SignupForm(this.formBuilder).createForm();
  }

  async submit(){
    if (this.signForm.valid) {
      const values = Object.values(this.signForm.value);
      await this.bd.createUser(values)
      .then((res)=> {
        console.log(JSON.stringify('DFO: resultado'+res))
        this.alert.alertNavigation('/main-login','Registro con éxito','Recibirá un correo para confirmar su registro')
      })
    }
  }
}
