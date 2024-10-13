import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from "@angular/forms";

export class UpdateMedicForm {
    private formBuilder : FormBuilder;

    constructor(formBuilder : FormBuilder){
        this.formBuilder = formBuilder;
    }

    createForm() : FormGroup {
        return this.formBuilder.group({
            firstName : ['', [
                Validators.pattern('[a-zA-ZÀ-ÖØ-öø-ÿ]*')
            ]],
            secondName : ['', [
                Validators.pattern('[a-zA-ZÀ-ÖØ-öø-ÿ]*')
            ]],
            lastName : ['', [
                Validators.pattern('[a-zA-ZÀ-ÖØ-öø-ÿ]*')
            ]],
            secondLastName : ['', [
                Validators.pattern('[a-zA-ZÀ-ÖØ-öø-ÿ]*')
            ]],
            phone : ['', [
                Validators.pattern('[0-9]*'), 
                Validators.minLength(9)
            ]],
            box : ['',[
                
            ]]
        })
    }
}