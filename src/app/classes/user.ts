export class User {
    idUser! : number;
    email! : string;
    //pw! : string; por obvias razones no se debe guardar el password en el programa, debe consultarlo siempre
    active! : number;
    fotoPerfil! : object;
    idRole! : number;

    constructor(idUser : number, email : string, active : number, fotoPerfil : object, idRole : number){
        this.idUser = idUser;
        this.email = email;
        ///this.pw = pw;
        this.active = active;
        this.fotoPerfil = fotoPerfil;
        this.idRole = idRole;
    }
}
