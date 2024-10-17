import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

export class NewPatientForm {
    private formBuilder : FormBuilder;

    constructor(formBuilder : FormBuilder){
        this.formBuilder = formBuilder;
    }

    createForm() : FormGroup {
        return this.formBuilder.group({
            firstName : ['', [
                Validators.required, 
                Validators.pattern('[a-zA-ZÀ-ÖØ-öø-ÿ]*')
            ]],
            secondName : ['', [
                Validators.required, 
                Validators.pattern('[a-zA-ZÀ-ÖØ-öø-ÿ]*')
            ]],
            lastName : ['', [
                Validators.required, 
                Validators.pattern('[a-zA-ZÀ-ÖØ-öø-ÿ]*')
            ]],
            secondLastName : ['', [
                Validators.required, 
                Validators.pattern('[a-zA-ZÀ-ÖØ-öø-ÿ]*')
            ]],
            run : ['', [
                Validators.required,
                Validators.pattern('^[0-9]+-[0-9kK]{1}$'),
                this.rutValido
            ]],
            phone : ['', [
                Validators.required, 
                Validators.pattern('[0-9]*'), 
                Validators.minLength(9)
            ]],
            email : ['', [Validators.required, Validators.email]],
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
        },{ validators : this.confirmPassword })
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

    rutValido(control : FormControl){
        const rut = control.value;
        try{
            const splitRut = rut.split('-');
            const nums = splitRut[0];
            const dv = splitRut[1];
            if(rut!=""){
                const invNum = nums.split("").reverse();
                const factor = [2,3,4,5,6,7]
                let x = 0
                let sumatoria = 0;
                for (let i = 0; i<invNum.length;i++){
                    sumatoria+= parseInt(invNum[i]) * factor[x]
                    x+=1
                    if(x>5){x=0};
                    }
                const mult = (Math.trunc(sumatoria/11))*11;
                const resta = sumatoria - mult;
                const resultado = 11 - resta;
                let dvAVerificar;
                if (dv.toLowerCase() === 'k'){
                    dvAVerificar = 10
                } else if (dv === '0'){
                    dvAVerificar = 11
                } else {
                    dvAVerificar = parseInt(dv);
                }
                if(dvAVerificar != resultado){
                    return {rutValido : true}
                }
            }
            return null;  
        } catch {
            return {rutValido : true};
        }
        
    }
}