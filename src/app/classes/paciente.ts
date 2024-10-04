export class Paciente {
    numrunPaciente! : number;
    dvRunPaciente! : string;
    pnombrePaciente! : string;
    snombrePaciente! : string;
    apaternoPaciente! : string;
    amaternoPaciente! : string;
    telPaciente! : number;
    idUser! : number;

    constructor(numrun : number, dvRun : string, pnombre : string, snombre : string, apaterno : string, amaterno : string, tel : number, id : number){
        this.numrunPaciente = numrun
        this.dvRunPaciente = dvRun
        this.pnombrePaciente = pnombre
        this.snombrePaciente = snombre
        this.apaternoPaciente = apaterno
        this.amaternoPaciente = amaterno
        this. telPaciente = tel
        this.idUser = id
    }
}
