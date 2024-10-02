import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlerttoastService } from './alerttoast.service';


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
    'CREATE TABLE IF NOT EXISTS log (id_log INTEGER PRIMARY KEY AUTOINCREMENT, anno_log INTEGER NOT NULL, mes_log INTEGER NOT NULL, dia_log INTEGER NOT NULL, hora_log VARCHAR(10) NOT NULL, id_user INTEGER NOT NULL, id_type INTEGER NOT NULL, FOREIGN KEY(id_user) REFERENCES user(id_user), FOREIGN KEY(id_type) REFERENCES log_type(id_type);',
    'CREATE TABLE IF NOT EXISTS medico (numrun_medico INTEGER PRIMARY KEY, dvrun_medico VARCHAR(1) NOT NULL, pnombre_medico VARCHAR(50) NOT NULL, snombre_medico VARCHAR(50) NOT NULL, apaterno_medico VARCHAR(50) NOT NULL, amaterno_medico VARCHAR(50) NOT NULL, tel_medico INTEGER NOT NULL, box_medico VARCHAR(50) NOT NULL, tiempo_bloque INTEGER NOT NULL, id_esp INTEGER NOT NULL, id_user INTEGER NOT NULL, FOREIGN KEY(id_esp) REFERENCES especialidad(id_esp), FOREIGN KEY(id_user) REFERENCES user(id_user));',
    'CREATE TABLE IF NOT EXISTS paciente (numrun_paciente INTEGER PRIMARY KEY, dvrun_paciente VARCHAR(1) NOT NULL, pnombre_paciente VARCHAR(50) NOT NULL, snombre_paciente VARCHAR(50) NOT NULL, apaterno_paciente VARCHAR(50) NOT NULL, amaterno_paciente VARCHAR(50) NOT NULL, tel_paciente INTEGER NOT NULL, id_user INTEGER NOT NULL, FOREIGN KEY(id_user) REFERENCES user(id_user));',
    'CREATE TABLE IF NOT EXISTS cita_medica (id_cita INTEGER PRIMARY KEY AUTOINCREMENT, anno_cita INTEGER NOT NULL, mes_cita INTEGER NOT NULL, dia_cita INTEGER NOT NULL, hora_cita VARCHAR(5) NOT NULL, id_estado INTEGER NOT NULL, numrun_paciente INTEGER NOT NULL, numrun_medico INTEGER NOT NULL, FOREIGN KEY(id_estado) REFERENCES estado_cita(id_estado), FOREIGN KEY(numrun_paciente) REFERENCES paciente(numrun_paciente), FOREIGN KEY(numrun_medico) REFERENCES medico(numrun_medico));',
    'CREATE TABLE IF NOT EXISTS mes (id_mes INTEGER PRIMARY KEY AUTOINCREMENT, nom_mes VARCHAR(12) NOT NULL, id_trimestre INTEGER NOT NULL, FOREIGN KEY(id_trimestre) REFERENCES trimestre(id_trimestre));',
    'CREATE TABLE IF NOT EXISTS anno (id_anno INTEGER PRIMARY KEY AUTOINCREMENT, anno INTEGER NOT NULL, id_trimestre INTEGER NOT NULL, active INTEGER CHECK(active in (0,1)), FOREIGN KEY(id_trimestre) REFERENCES trimestre(id_trimestre));',
    'CREATE TABLE IF NOT EXISTS agenda_medica (id_agenda INTEGER PRIMARY KEY AUTOINCREMENT, mes_agenda INTEGER NOT NULL, dia_agenda INTEGER NOT NULL, hora_inicio VARCHAR(5) NOT NULL, hora_termino VARCHAR(5), numrun_medico INTEGER NOT NULL, id_anno INTEGER NOT NULL, FOREIGN KEY(numrun_medico) REFERENCES medico(numrun_medico), FOREIGN KEY(id_anno) REFERENCES anno(id_anno));'
  ];
  queryInsertDefaults : any;
  insertsReady : boolean = false;
  // creacion de tablas
  private isDBReady : BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite : SQLite, 
    private platform : Platform, 
    private storage : NativeStorage,
    private toast : AlerttoastService) { 
    // fetch('./assets/json/queryInsertDefaults.json')
    // .then(res => res.json)
    // .then(json => {
    //   this.queryInsertDefaults = json;
    //   console.log('queryDefaults Listo')
    // })
  }
  createDB(){
    
    this.platform.ready().then(()=>{
      this.sqlite.create({
        name: 'medschdb',
        location: 'default'
      }).then((db: SQLiteObject) =>{
        this.database = db;
        this.toast.presentToast('BD creada')
        this.isDBReady.next(true);
        this.createTables()
      }).catch((e: string) => this.toast.presentToast('Error al crear base de datos: '+ JSON.stringify(e), 500));
    })
  }

  async createTables(){
    for (let i = 0; i < this.queryTables.length; i++){
      let query = this.queryTables[i];
      try{
        await this.database.executeSql(query, []);
        this.toast.presentToast( (i+1)+' Tablas creadas');
        console.log('Tabla creada')
        // no se si falta algo aquí
      } catch(e) {
        this.toast.presentToast('Error al crear tabla :' + JSON.stringify(e));
        console.log('Error al crear tabla: '+ JSON.stringify(e));
      }
    }
    this.toast.presentToast('Tablas completadas');
    console.log("Tablas completas");
    this.insertDefaultValues();
  }
  async insertDefaultValues(){
    console.log("en insertDefaultValues");
    let ready : boolean = false;
    await fetch('./assets/json/queryInsertDefaults.json')
    .then(res => res.json())
    .then(json => {
      this.queryInsertDefaults = json;
    })
    for (let elemento of this.queryInsertDefaults) {
      const table = elemento.table;
      const query = "DELETE FROM "+ table + ";"
      await this.database.executeSql(query, [])
      .then(()=> {
        console.log('Limpiando Registros')
      })
      .catch(e => this.toast.presentToast('Error de registro: '+ JSON.stringify(e)));
    }

    for (let elemento of this.queryInsertDefaults) {
      const table = elemento.table;
      const values = elemento.values;
      const columns = elemento.columns;
      const query = "INSERT OR IGNORE INTO "+ table + "("+ columns +")"+ " VALUES(" + values + ");"
      await this.database.executeSql(query, [])
      .then(()=> {
        console.log('Dato insertado en '+ table + ' Columnas ' + columns + ' Valores '+ values);
        ready = true;
      })
      .catch(e => this.toast.presentToast('Error de registro: '+ JSON.stringify(e))); 
    }
    this.toast.presentToast('Registros completos');
    this.insertsReady = ready;
  }

  async getUser(email : string, pw : string){
    let response = {};
    let isValid = false;
    let query = "SELECT * FROM user WHERE email='"+ email + "' AND  pw='"+ pw + "';";
    await this.database.executeSql(query,[])
    .then((res) => {
      console.log('Query passed. Length: '+res.rows.length);
      if (res.rows.length>0){
        console.log('Usuario encontrado')
        console.log(res.rows.item(0).id_user);
        response = {
          idUser : res.rows.item(0).id_user,
          email : res.rows.item(0).email,
          active : res.rows.item(0).active,
          fotoPerfil : res.rows.item(0).foto_perfil,
          idRole : res.rows.item(0).id_role
        }
        isValid = true;
        this.storage.setItem("userLogged", JSON.stringify(response));
      }
    }).catch((e) => {
      this.toast.presentToast('Usuario no encontrado: '+ JSON.stringify(e))
    });
    return isValid;
  }

  allInsertsReady(){
    return this.insertsReady;
  }

  insertLog(userId : number, logType : number){
    const query = 'INSERT INTO log'
  }

  /// SOLO POR PROPOSITOS DE TESTING, NO USAR
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
      this.toast.presentToast('Error en datos: '+ error);
    })
  }

  async getAllUsers(){
    let result = [];
    let query = "SELECT * FROM user WHERE email='d.fernoliva@gmail.com' AND  pw='contrasena2024';";
    await this.database.executeSql(query,[])
    .then((res) => {
      console.log('Query passed. Length: '+res.rows.length);
      if (res.rows.length>0){
        console.log('hay datos en la tabla')
        console.log(res.rows.item(0).email);
        console.log(res.rows.item(0).pw);
      }
    }).catch(e => console.log('Sin resultados '+ e));
  }
}

