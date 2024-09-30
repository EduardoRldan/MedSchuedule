import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class ServicebdService {
  public database! : SQLiteObject;
  queryTables : any = [
    'CREATE TABLE IF NOT EXISTS especialidad (id_esp INTEGER PRIMARY KEY AUTOINCREMENT, nom_esp VARCHAR(30) NOT NULL);',
    'CREATE TABLE IF NOT EXISTS role (id_role INTEGER PRIMARY KEY AUTOINCREMENT, role_name VARCHAR(15) NOT NULL);',
    'CREATE TABLE IF NOT EXISTS trimestre (id_trimestre INTEGER PRIMARY KEY AUTOINCREMENT, nom_trimestre VARCHAR(10) NOT NULL);',
    'CREATE TABLE IF NOT EXISTS estado_cita (id_estado INTEGER PRIMARY KEY AUTOINCREMENT, nom_estado VARCHAR(10) NOT NULL);',
    'CREATE TABLE IF NOT EXISTS log_type (id_type INTEGER PRIMARY KEY AUTOINCREMENT, desc_type VARCHAR(50) NOT NULL);',
    'CREATE TABLE IF NOT EXISTS user (id_user INTEGER PRIMARY KEY AUTOINCREMENT, email VARCHAR(50) UNIQUE NOT NULL, pw VARCHAR(100) NOT NULL, active INTEGER CHECK(active IN (0,1)), foto_perfil BLOB, id_role INTEGER NOT NULL, FOREIGN KEY(id_role) REFERENCES role(id_role));',
    'CREATE TABLE IF NOT EXISTS medico (numrun_medico INTEGER PRIMARY KEY, dvrun_medico VARCHAR(1) NOT NULL, pnombre_medico VARCHAR(50) NOT NULL, snombre_medico VARCHAR(50) NOT NULL, apaterno_medico VARCHAR(50) NOT NULL, amaterno_medico VARCHAR(50) NOT NULL, tel_medico INTEGER NOT NULL, box_medico VARCHAR(50) NOT NULL, tiempo_bloque INTEGER NOT NULL, id_esp INTEGER NOT NULL, id_user INTEGER NOT NULL, FOREIGN KEY(id_esp) REFERENCES especialidad(id_esp), FOREIGN KEY(id_user) REFERENCES user(id_user));',
    'CREATE TABLE IF NOT EXISTS paciente (numrun_paciente INTEGER PRIMARY KEY, dvrun_paciente VARCHAR(1) NOT NULL, pnombre_paciente VARCHAR(50) NOT NULL, snombre_paciente VARCHAR(50) NOT NULL, apaterno_paciente VARCHAR(50) NOT NULL, amaterno_paciente VARCHAR(50) NOT NULL, tel_paciente INTEGER NOT NULL, id_user INTEGER NOT NULL, FOREIGN KEY(id_user) REFERENCES user(id_user));',
    'CREATE TABLE IF NOT EXISTS cita_medica (id_cita INTEGER PRIMARY KEY AUTOINCREMENT, anno_cita INTEGER NOT NULL, mes_cita INTEGER NOT NULL, dia_cita INTEGER NOT NULL, hora_cita VARCHAR(5) NOT NULL, id_estado INTEGER NOT NULL, numrun_paciente INTEGER NOT NULL, numrun_medico INTEGER NOT NULL, FOREIGN KEY(id_estado) REFERENCES estado_cita(id_estado), FOREIGN KEY(numrun_paciente) REFERENCES paciente(numrun_paciente), FOREIGN KEY(numrun_medico) REFERENCES medico(numrun_medico));',
    'CREATE TABLE IF NOT EXISTS mes (id_mes INTEGER PRIMARY KEY AUTOINCREMENT, nom_mes VARCHAR(12) NOT NULL, id_trimestre INTEGER NOT NULL, FOREIGN KEY(id_trimestre) REFERENCES trimestre(id_trimestre));',
    'CREATE TABLE IF NOT EXISTS anno (id_anno INTEGER PRIMARY KEY AUTOINCREMENT, anno INTEGER NOT NULL, id_trimestre INTEGER NOT NULL, active INTEGER CHECK(active in (0,1)), FOREIGN KEY(id_trimestre) REFERENCES trimestre(id_trimestre));',
    'CREATE TABLE IF NOT EXISTS agenda_medica (id_agenda INTEGER PRIMARY KEY AUTOINCREMENT, mes_agenda INTEGER NOT NULL, dia_agenda INTEGER NOT NULL, hora_inicio VARCHAR(5) NOT NULL, hora_termino VARCHAR(5), numrun_medico INTEGER NOT NULL, id_anno INTEGER NOT NULL, FOREIGN KEY(numrun_medico) REFERENCES medico(numrun_medico), FOREIGN KEY(id_anno) REFERENCES anno(id_anno));'
  ];
  queryInsertDefaults : any;
  // creacion de tablas

  constructor(private sqlite : SQLite, private toastController : ToastController) { 
    // fetch('./assets/json/queryInsertDefaults.json')
    // .then(res => res.json)
    // .then(json => {
    //   this.queryInsertDefaults = json;
    //   console.log('queryDefaults Listo')
    // })
  }
  async presentToast(msj : string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 500,
      position: 'bottom',
    });

    await toast.present();
  }
  createDB(){
    this.sqlite.create({
      name: 'medschdb',
      location: 'default'
    }).then((db: SQLiteObject) =>{
      this.database = db;
      this.presentToast('BD creada')
      this.createTables()
    }).catch((e: string) => this.presentToast('Error al crear base de datos: '+ e));
  }

  async createTables(){
    for (let i = 0; i < this.queryTables.length; i++){
      let query = this.queryTables[i];
      try{
        await this.database.executeSql(query, []);
        this.presentToast( (i+1)+' Tablas creadas');
        console.log('Tabla creada')
        // no se si falta algo aquí
      } catch(error) {
        this.presentToast('Error al crear tabla :' + error);
        console.log('Error al crear tabla: '+ error);
      }
    }
    this.presentToast('Tablas completadas');
    console.log("Tablas completas");
    this.insertDefaultValues();
  }
  async insertDefaultValues(){
    console.log("en insertDefaultValues");
    fetch('./assets/json/queryInsertDefaults.json')
    .then(res => res.json())
    .then(json => {
      this.queryInsertDefaults = json;
      for (let elemento of this.queryInsertDefaults) {
        const table = elemento.table;
        const query = "DELETE FROM "+ table + ";"
        this.database.executeSql(query, [])
        .then(()=> {
          console.log('Limpiando Registros')
        })
        .catch(e => this.presentToast('Error de registro: '+ e));
      }
      // let exQuery = "INSERT INTO especialidad(nom_esp) VALUES('Medicina General');"
      // this.database.executeSql(exQuery,[])
      // .then(()=> console.log('Dato insertado de prueba'))
      // .catch(e => console.log('Error '+ e));

      for (let elemento of this.queryInsertDefaults) {
        const table = elemento.table;
        const values = elemento.values;
        const columns = elemento.columns;
        const query = "INSERT INTO "+ table + "("+ columns +")"+ " VALUES(" + values + ");"
        this.database.executeSql(query, [])
        .then(()=> console.log('Dato insertado correctamente'))
        .catch(e => this.presentToast('Error de registro: '+ e)); 
      }
    })
    this.presentToast('Registros completos');
  }
  getUser(email : string, pw : string){
    let query = "SELECT email, pw FROM user WHERE email='"+ email + "' AND pw='"+ pw + "';";
    let idUser = "";
    let em = "";
    let active = ""
    let role = "";
    this.database.executeSql(query,[])
    .then((res) => {
      idUser = res.rows.item(0).id_user;
      em = res.rows.item(0).email;
      active = res.rows.item(0).active;
      role = res.rows.item(0).id_role;
      console.log(active);
    }). catch((e) => {
      this.presentToast('Usuario no encontrado' + e);
      console.log('NOT FOUND');
    })
  }
  getAllTables(){
    let tableList = [];
    this.database.executeSql("SELECT name FROM sqlite_master WHERE type='table';",[])
    .then((res) =>{
      for (let i = 0; i < res.rows.length; i++){
        tableList.push(res.rows.item(i).name);
        console.log('getAllTables')
        console.log(res.rows.item(i).name);
      }
      return tableList;
    }).catch((error) => {
      this.presentToast('Error en datos: '+ error);
    })
  }
}

