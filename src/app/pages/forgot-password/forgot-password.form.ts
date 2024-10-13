import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from "@angular/forms";

export class ForgotPasswordForm {
    private formBuilder : FormBuilder;

    constructor(formBuilder : FormBuilder){
        this.formBuilder = formBuilder;
    }
    createForm() : FormGroup {
        return this.formBuilder.group({
            pw1 : ['', [
                Validators.required, 
                this.minLength8,
                this.hasLettersAndNumbers,
                this.noSpaces,
                this.noProhibitedCharacters,
                this.noLatinCharacters
            ]],
            pw2 : ['', [
                Validators.required, 
                Validators.minLength(8)
            ]]
        }, { validators : this.confirmPassword })
    }
    hasLettersAndNumbers(control : FormControl){
        const hasLetter = /[A-Za-z]/.test(control.value);
        const hasNumber = /\d/.test(control.value)
        if(control.value != ""){
            if (hasLetter != true || hasNumber != true){
                return {hasLettersAndNumbers : true}
            }
        }
        return null
    }
    noSpaces(control : FormControl){
        const pw = control.value
        if(pw != ""){
            if(pw.indexOf(' ') != -1){
                return {noSpaces : true}
            }
        }
        return null
    }
    noProhibitedCharacters(control : FormControl){
        const pw = control.value;
        const hasCharacters = /^[^()\/=@%&$#"'´{}[\]?!¿¡*]+$/.test(pw)
        if(pw!= ""){
            if(!hasCharacters){
                return {noProhibitedCharacters : true}
            }
        }
        return null
    }
    minLength8(control : FormControl) {
        const pw = control.value;
        if(pw!= ""){
            if(pw.length <8){
                return {minLength8 : true}
            }
        }
        return null
    }
    noLatinCharacters(control : FormControl){
        const pw = control.value;
        const hasLatinChar =  /^[^áéíóúñÁÉÍÓÚÑ]+$/.test(pw);
        if(pw!=""){
            if(!hasLatinChar){
                return {noLatinCharacters : true}
            }
        }
        return null
    }
    confirmPassword(control : AbstractControl){
        const pw2 = control.get('pw2')?.value;
        const pw1 = control.get('pw1')?.value;
        if (pw1 != "" && pw2 != ""){
            if(pw1 != pw2){
                console.log('No coinciden')
                return {confirmPassword : true}
            }
        }
        return null
    }
}