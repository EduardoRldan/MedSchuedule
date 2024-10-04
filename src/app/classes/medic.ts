export class Medic {
    numrunMedico! : number;
    dvRunMedico! : string;
    pnombreMedico! : string;
    snombreMedico! : string;
    apaternoMedico! : string;
    amaternoMedico! : string;
    telMedico! : number;
    boxMedico! : string;
    tiempoBloque! : number;
    idEsp! : number;
    idUser! : number;

    constructor(
        numrun : number,
        dvRun : string,
        pnombre : string,
        snombre : string,
        apaterno : string,
        amaterno : string,
        tel : number,
        box : string,
        tiempoBloque : number,
        idEsp : number,
        idUser : number){
            this.numrunMedico = numrun;
            this.dvRunMedico = dvRun;
            this.pnombreMedico = pnombre;
            this.snombreMedico = snombre;
            this.apaternoMedico = apaterno;
            this.amaternoMedico = amaterno;
            this.telMedico = tel;
            this.boxMedico = box;
            this.tiempoBloque = tiempoBloque;
            this.idEsp = idEsp;
            this.idUser = idUser;
        }
}
