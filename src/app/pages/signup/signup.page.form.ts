import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class SignupForm {
    private formBuilder : FormBuilder;

    constructor(formBuilder : FormBuilder){
        this.formBuilder = formBuilder;
    }

    createForm() : FormGroup {
        return this.formBuilder.group({
            firstName : ['', [
                Validators.required, 
                Validators.pattern('[a-zA-ZÀ-ÖØ-öø-ÿ ]*')
            ]],
            lastName : ['', [
                Validators.required, 
                Validators.pattern('[a-zA-ZÀ-ÖØ-öø-ÿ ]*')
            ]],
            run : ['', [
                Validators.required,
                Validators.pattern('^[0-9]+-[0-9kK]{1}$')
            ]],
            email : ['', [Validators.required, Validators.email]],
            phone : ['', [
                Validators.required, 
                Validators.pattern('[0-9]*'), 
                Validators.minLength(9)
            ]],
            pw1 : ['', [
                Validators.required, 
                Validators.minLength(8)
            ]],
            pw2 : ['', [
                Validators.required, 
                Validators.minLength(8)
            ]]
        })
    }
}