import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlerttoastService } from './alerttoast.service';
import { ObjectHandlerService } from './object-handler.service';
import { EncoderService } from './encoder.service';
import { CitaMedica } from '../classes/cita-medica';


@Injectable({
  providedIn: 'root'
})
export class ServicebdService {
  public database! : SQLiteObject;
  bulkQuery : any = [
    "CREATE TABLE IF NOT EXISTS especialidad (id_esp INTEGER PRIMARY KEY AUTOINCREMENT, nom_esp VARCHAR(30) NOT NULL);",
"CREATE TABLE IF NOT EXISTS role (id_role INTEGER PRIMARY KEY AUTOINCREMENT, role_name VARCHAR(15) NOT NULL);",
"CREATE TABLE IF NOT EXISTS trimestre (id_trimestre INTEGER PRIMARY KEY AUTOINCREMENT, nom_trimestre VARCHAR(10) NOT NULL);",
"CREATE TABLE IF NOT EXISTS estado_cita (id_estado INTEGER PRIMARY KEY AUTOINCREMENT, nom_estado VARCHAR(10) NOT NULL);",
"CREATE TABLE IF NOT EXISTS log_type (id_type INTEGER PRIMARY KEY AUTOINCREMENT, desc_type VARCHAR(50) NOT NULL);",
"CREATE TABLE IF NOT EXISTS user (id_user INTEGER PRIMARY KEY AUTOINCREMENT, email VARCHAR(50) UNIQUE NOT NULL, pw VARCHAR(100) NOT NULL, active INTEGER CHECK(active IN (0,1)), foto_perfil BLOB, id_role INTEGER NOT NULL, FOREIGN KEY(id_role) REFERENCES role(id_role));",
"CREATE TABLE IF NOT EXISTS log (id_log INTEGER PRIMARY KEY AUTOINCREMENT, anno_log INTEGER NOT NULL, mes_log INTEGER NOT NULL, dia_log INTEGER NOT NULL, hora_log VARCHAR(10) NOT NULL, id_user INTEGER NOT NULL, id_type INTEGER NOT NULL, FOREIGN KEY(id_user) REFERENCES user(id_user), FOREIGN KEY(id_type) REFERENCES log_type(id_type));",
"CREATE TABLE IF NOT EXISTS medico (numrun_medico INTEGER PRIMARY KEY, dvrun_medico VARCHAR(1) NOT NULL, pnombre_medico VARCHAR(50) NOT NULL, snombre_medico VARCHAR(50) NOT NULL, apaterno_medico VARCHAR(50) NOT NULL, amaterno_medico VARCHAR(50) NOT NULL, tel_medico INTEGER NOT NULL, box_medico VARCHAR(50) NOT NULL, tiempo_bloque INTEGER NOT NULL, id_esp INTEGER NOT NULL, id_user INTEGER NOT NULL, FOREIGN KEY(id_esp) REFERENCES especialidad(id_esp), FOREIGN KEY(id_user) REFERENCES user(id_user));",
"CREATE TABLE IF NOT EXISTS paciente (numrun_paciente INTEGER PRIMARY KEY, dvrun_paciente VARCHAR(1) NOT NULL, pnombre_paciente VARCHAR(50) NOT NULL, snombre_paciente VARCHAR(50) NOT NULL, apaterno_paciente VARCHAR(50) NOT NULL, amaterno_paciente VARCHAR(50) NOT NULL, tel_paciente INTEGER NOT NULL, id_user INTEGER NOT NULL, FOREIGN KEY(id_user) REFERENCES user(id_user));",
"CREATE TABLE IF NOT EXISTS cita_medica (id_cita INTEGER PRIMARY KEY AUTOINCREMENT, anno_cita INTEGER NOT NULL, mes_cita INTEGER NOT NULL, dia_cita INTEGER NOT NULL, hora_cita VARCHAR(5) NOT NULL, id_estado INTEGER NOT NULL, numrun_paciente INTEGER NOT NULL, numrun_medico INTEGER NOT NULL, FOREIGN KEY(id_estado) REFERENCES estado_cita(id_estado), FOREIGN KEY(numrun_paciente) REFERENCES paciente(numrun_paciente), FOREIGN KEY(numrun_medico) REFERENCES medico(numrun_medico));",
"CREATE TABLE IF NOT EXISTS mes (id_mes INTEGER PRIMARY KEY AUTOINCREMENT, nom_mes VARCHAR(12) NOT NULL, id_trimestre INTEGER NOT NULL, FOREIGN KEY(id_trimestre) REFERENCES trimestre(id_trimestre));",
"CREATE TABLE IF NOT EXISTS anno (id_anno INTEGER PRIMARY KEY AUTOINCREMENT, anno INTEGER NOT NULL, id_trimestre INTEGER NOT NULL, active INTEGER CHECK(active in (0,1)), FOREIGN KEY(id_trimestre) REFERENCES trimestre(id_trimestre));",
"CREATE TABLE IF NOT EXISTS agenda_medica (id_agenda INTEGER PRIMARY KEY AUTOINCREMENT, mes_agenda INTEGER NOT NULL, dia_agenda INTEGER NOT NULL, hora_inicio VARCHAR(5) NOT NULL, hora_termino VARCHAR(5), numrun_medico INTEGER NOT NULL, id_anno INTEGER NOT NULL, FOREIGN KEY(numrun_medico) REFERENCES medico(numrun_medico), FOREIGN KEY(id_anno) REFERENCES anno(id_anno));",
"INSERT OR IGNORE INTO especialidad(id_esp, nom_esp) VALUES(1, 'Medicina General');",
"INSERT OR IGNORE INTO especialidad(id_esp, nom_esp) VALUES(2, 'Kinesiología');",
"INSERT OR IGNORE INTO especialidad(id_esp, nom_esp) VALUES(3, 'Broncopulmonar');",
"INSERT OR IGNORE INTO especialidad(id_esp, nom_esp) VALUES(4, 'Traumatología');",
"INSERT OR IGNORE INTO especialidad(id_esp, nom_esp) VALUES(5, 'Cardiología');",
"INSERT OR IGNORE INTO especialidad(id_esp, nom_esp) VALUES(6, 'Oncología');",
"INSERT OR IGNORE INTO especialidad(id_esp, nom_esp) VALUES(7, 'Otorrinolaringología');",
"INSERT OR IGNORE INTO role(id_role, role_name) VALUES(1, 'Paciente');",
"INSERT OR IGNORE INTO role(id_role, role_name) VALUES(2, 'Médico');",
"INSERT OR IGNORE INTO role(id_role, role_name) VALUES(3, 'Admin');",
"INSERT OR IGNORE INTO estado_cita(id_estado, nom_estado) VALUES(1, 'Activo');",
"INSERT OR IGNORE INTO estado_cita(id_estado, nom_estado) VALUES(2, 'Cancelado');",
"INSERT OR IGNORE INTO estado_cita(id_estado, nom_estado) VALUES(3, 'Finalizado');",
"INSERT OR IGNORE INTO trimestre(id_trimestre, nom_trimestre) VALUES(1, 'Primer');",
"INSERT OR IGNORE INTO trimestre(id_trimestre, nom_trimestre) VALUES(2, 'Segundo');",
"INSERT OR IGNORE INTO trimestre(id_trimestre, nom_trimestre) VALUES(3, 'Tercer');",
"INSERT OR IGNORE INTO trimestre(id_trimestre, nom_trimestre) VALUES(4, 'Cuarto');",
"INSERT OR IGNORE INTO mes(id_mes, nom_mes, id_trimestre) VALUES(1,'Enero',1);",
"INSERT OR IGNORE INTO mes(id_mes, nom_mes, id_trimestre) VALUES(2,'Febrero',1);",
"INSERT OR IGNORE INTO mes(id_mes, nom_mes, id_trimestre) VALUES(3,'Marzo',1);",
"INSERT OR IGNORE INTO mes(id_mes, nom_mes, id_trimestre) VALUES(4,'Abril',2);",
"INSERT OR IGNORE INTO mes(id_mes, nom_mes, id_trimestre) VALUES(5,'Mayo',2);",
"INSERT OR IGNORE INTO mes(id_mes, nom_mes, id_trimestre) VALUES(6,'Junio',2);",
"INSERT OR IGNORE INTO mes(id_mes, nom_mes, id_trimestre) VALUES(7,'Julio',3);",
"INSERT OR IGNORE INTO mes(id_mes, nom_mes, id_trimestre) VALUES(8,'Agosto',3);",
"INSERT OR IGNORE INTO mes(id_mes, nom_mes, id_trimestre) VALUES(9,'Septiembre',3);",
"INSERT OR IGNORE INTO mes(id_mes, nom_mes, id_trimestre) VALUES(10,'Octubre',4);",
"INSERT OR IGNORE INTO mes(id_mes, nom_mes, id_trimestre) VALUES(11,'Noviembre',4);",
"INSERT OR IGNORE INTO mes(id_mes, nom_mes, id_trimestre) VALUES(12,'Diciembre',4);",
"INSERT OR IGNORE INTO log_type(id_type, desc_type) VALUES(1, 'Registro de Usuario');",
"INSERT OR IGNORE INTO log_type(id_type, desc_type) VALUES(2, 'Login Usuario');",
"INSERT OR IGNORE INTO log_type(id_type, desc_type) VALUES(3, 'Nueva cita médica');",
"INSERT OR IGNORE INTO log_type(id_type, desc_type) VALUES(4, 'Cancela Cita médica');",
"INSERT OR IGNORE INTO log_type(id_type, desc_type) VALUES(5, 'Nueva agenda médica');",
"INSERT OR IGNORE INTO log_type(id_type, desc_type) VALUES(6, 'Modifica agenda médica');",
"INSERT OR IGNORE INTO log_type(id_type, desc_type) VALUES(7, 'Logout Usuario');",
"INSERT OR IGNORE INTO anno(id_anno, anno, id_trimestre, active) VALUES(1,2024,4,1);",
"INSERT OR IGNORE INTO user(email, pw, active, foto_perfil, id_role) VALUES('d.fernoliva@gmail.com', 'contrasena2024', 1, NULL, 2);",
"INSERT OR IGNORE INTO user(email, pw, active, foto_perfil, id_role) VALUES('p.troncoso@gmail.com', 'troncoso2024',1, NULL, 2);",
"INSERT OR IGNORE INTO user(email, pw, active, foto_perfil, id_role) VALUES('a.troncoso@gmail.com', 'adolfo2024', 1, NULL, 2);",
"INSERT OR IGNORE INTO user(email, pw, active, foto_perfil, id_role) VALUES('cri.bahamondes@gmail.com', 'christopher2024', 1, NULL, 2);",
"INSERT OR IGNORE INTO medico(numrun_medico, dvrun_medico, pnombre_medico, snombre_medico, apaterno_medico, amaterno_medico, tel_medico, box_medico, tiempo_bloque, id_esp, id_user) VALUES(18007012,'5','Diego','Andres','Fernandez','Oliva',981744765,'Box 1',30,1,1)",
"INSERT OR IGNORE INTO medico(numrun_medico, dvrun_medico, pnombre_medico, snombre_medico, apaterno_medico, amaterno_medico, tel_medico, box_medico, tiempo_bloque, id_esp, id_user) VALUES(18456789,'k','Pablo','Rodrigo','Troncoso','Ortega',981744765,'Box 2',30,2,2)",
"INSERT OR IGNORE INTO medico(numrun_medico, dvrun_medico, pnombre_medico, snombre_medico, apaterno_medico, amaterno_medico, tel_medico, box_medico, tiempo_bloque, id_esp, id_user) VALUES(21546789,'0','Adolfo','Roberto','Troncoso','Ortega',981744765,'Box 3',30,3,3)",
"INSERT OR IGNORE INTO medico(numrun_medico, dvrun_medico, pnombre_medico, snombre_medico, apaterno_medico, amaterno_medico, tel_medico, box_medico, tiempo_bloque, id_esp, id_user) VALUES(19321556,'2','Christopher','Cristobal','Bahamondes','Vargas',981744765,'Box 4',30,4,4)"
  ]

  queryTables : any = [
    'CREATE TABLE IF NOT EXISTS especialidad (id_esp INTEGER PRIMARY KEY AUTOINCREMENT, nom_esp VARCHAR(30) NOT NULL);',
    'CREATE TABLE IF NOT EXISTS role (id_role INTEGER PRIMARY KEY AUTOINCREMENT, role_name VARCHAR(15) NOT NULL);',
    'CREATE TABLE IF NOT EXISTS trimestre (id_trimestre INTEGER PRIMARY KEY AUTOINCREMENT, nom_trimestre VARCHAR(10) NOT NULL);',
    'CREATE TABLE IF NOT EXISTS estado_cita (id_estado INTEGER PRIMARY KEY AUTOINCREMENT, nom_estado VARCHAR(10) NOT NULL);',
    'CREATE TABLE IF NOT EXISTS log_type (id_type INTEGER PRIMARY KEY AUTOINCREMENT, desc_type VARCHAR(50) NOT NULL);',
    'CREATE TABLE IF NOT EXISTS user (id_user INTEGER PRIMARY KEY AUTOINCREMENT, email VARCHAR(50) UNIQUE NOT NULL, pw VARCHAR(100) NOT NULL, active INTEGER CHECK(active IN (0,1)), foto_perfil BLOB, id_role INTEGER NOT NULL, FOREIGN KEY(id_role) REFERENCES role(id_role));',
    'CREATE TABLE IF NOT EXISTS log (id_log INTEGER PRIMARY KEY AUTOINCREMENT, anno_log INTEGER NOT NULL, mes_log INTEGER NOT NULL, dia_log INTEGER NOT NULL, hora_log VARCHAR(10) NOT NULL, id_user INTEGER NOT NULL, id_type INTEGER NOT NULL, FOREIGN KEY(id_user) REFERENCES user(id_user), FOREIGN KEY(id_type) REFERENCES log_type(id_type));',
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
  dbReady$ = this.isDBReady.asObservable();
  private gotId! : number;

  constructor(private sqlite : SQLite, 
    private platform : Platform, 
    private storage : NativeStorage,
    private toast : AlerttoastService,
    private ec : EncoderService) {
      this.createDB();
  }
  createDB(){
    
    this.platform.ready().then(()=>{
      this.sqlite.create({
        name: 'medschdb.db',
        location: 'default'
      }).then((db: SQLiteObject) =>{
        this.database = db;
        this.toast.presentToast('DFO: BD creada')
        //this.createTables()
        this.createTablesByBulk();
      }).catch((e: string) => this.toast.presentToast('Error al crear base de datos: '+ JSON.stringify(e), 500));
    })
  }
  async createTablesByBulk(){
    for(let i = 0; i<this.bulkQuery.length; i++){
      let query = this.bulkQuery[i];
      this.database.executeSql(query,[])
      .then(async () => {
        console.log('DFO: insertando: '+ query)
      }).catch(e => console.log('DFO: Fallo el query: ',JSON.stringify(e)))
    }
    this.isDBReady.next(true);
  }
  async createTables(){
    for (let i = 0; i < this.queryTables.length; i++){
      let query = this.queryTables[i];
      try{
        await this.database.executeSql(query, []);
        this.toast.presentToast( (i+1)+' Tablas creadas');
        console.log('DFO: Tabla creada')
        // no se si falta algo aquí
      } catch(e) {
        this.toast.presentToast('Error al crear tabla :' + JSON.stringify(e));
        console.log('DFO: Error al crear tabla: '+ JSON.stringify(e));
      }
    }
    this.toast.presentToast('Tablas completadas');
    console.log("DFO: Tablas completas");
    this.insertDefaultValues();
  }
  async insertDefaultValues(){
    console.log("DFO: en insertDefaultValues");
    let ready : boolean = false;
    await fetch('./assets/json/queryInsertDefaults.json')
    .then(res => res.json())
    .then(json => {
      this.queryInsertDefaults = json;
    })
    /// SOLO EN CASO DE PRUEBA, elimina todos los elementos por defecto de la BD
    /// considerar que los elementos autoincrementables cambiaran de valor cada vez que se ejecute un insert nuevo.
    // for (let elemento of this.queryInsertDefaults) {
    //   const table = elemento.table;
    //   const query = "DELETE FROM "+ table + ";"
    //   await this.database.executeSql(query, [])
    //   .then(()=> {
    //     console.log('Limpiando Registros')
    //   })
    //   .catch(e => this.toast.presentToast('Error de registro: '+ JSON.stringify(e)));
    // }

    for (let elemento of this.queryInsertDefaults) {
      const table = elemento.table;
      const values = elemento.values;
      const columns = elemento.columns;
      const query = "INSERT OR IGNORE INTO "+ table + "("+ columns +")"+ " VALUES(" + values + ");"
      await this.database.executeSql(query, [])
      .then(()=> {
        console.log('DFO: Dato insertado en '+ table + ' Columnas ' + columns + ' Valores '+ values);
        ready = true;
      })
      .catch(e => this.toast.presentToast('Error de registro: '+ JSON.stringify(e))); 
    }
    //await this.defaultMedicAcc();
    this.toast.presentToast('Registros completos');
    this.isDBReady.next(true);  // indica que la base de datos está lista
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
        console.log('DFO: Usuario encontrado')
        console.log("idUser: " +res.rows.item(0).id_user);
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
      this.toast.presentToast('Error al cargar usuario: '+ JSON.stringify(e))
    });
    return isValid;
  }

  async getMedic(idUser : number){
    // metodo que obtiene los datos del medico cuando este se loguea
    // solo se usa si el medico es quien se loguea
    let response = {};
    let query = "SELECT * FROM medico WHERE id_user ='"+ idUser + "';";
    await this.database.executeSql(query,[])
    .then((res) =>{
      if (res.rows.length>0){
        console.log("DFO: medico existe");
        response = {
          numrunMedico : res.rows.item(0).numrun_medico,
          dvRunMedico : res.rows.item(0).dvrun_medico,
          pnombreMedico : res.rows.item(0).pnombre_medico,
          snombreMedico : res.rows.item(0).snombre_medico,
          apaternoMedico : res.rows.item(0).apaterno_medico,
          amaternoMedico : res.rows.item(0).amaterno_medico,
          telMedico : res.rows.item(0).tel_medico,
          boxMedico : res.rows.item(0).box_medico,
          tiempoBloque : res.rows.item(0).tiempo_bloque,
          idEsp : res.rows.item(0).id_esp,
          idUser : idUser
        }
        this.storage.setItem('medicLogged', JSON.stringify(response))
      }else {
        console.log("DFO: Medico no existe")
      }
      //return this.handler.createMedicObject(response);
    })
  }

  async createUser(obj : object){
    console.log('creando usuario');
    const values = Object.values(obj);
    // vamos a hacer otra aproximación
    // los valores son 0 pnombre, 1 snombre, 2 apaterno, 3 amaterno, 4 run, 5 email, 6 phone, 7 pw, 8 pw2 (no se usa aca)
    let userObj = {
      email : values[5],
      pw : values[7],
      active : 1,
      fotoPerfil : {},
      idRole : 1
    }
    const rut = values[4] as string;
    const splitRun = rut.split('-');

    let patObj = {
      numrun : parseInt(splitRun[0]),
      dvrun : splitRun[1],
      pnombre : values[0],
      snombre : values[1],
      apaterno : values[2],
      amaterno : values[3],
      tel : values[6],
    }
    // const query1 = 'INSERT INTO user(email, pw, active, foto_perfil, id_role) VALUES(' +
    // "'${userObj.email}','${userObj.pw}',${userObj.active},${userObj.fotoPerfil}, ${userObj.idRole});";
    const query1 = 'INSERT INTO user(email, pw, active, foto_perfil, id_role) VALUES(?,?,?,?,?);'
    await this.database.executeSql(query1,[userObj.email,userObj.pw,userObj.active,userObj.fotoPerfil,userObj.idRole])
    .then(async () =>{
      console.log('DFO: Usuario registrado');
      await this.getIdUserPatient(userObj.email)
      .then(async () =>{
        console.log('DFO: Obteniendo ID')
        if (this.gotId>0){
          await this.createPatient(patObj, this.gotId);
        }
      })
    }).catch((e) => {
      console.log('Error al registrar Usuario: '+ JSON.stringify(e))
    });
  }

  async getIdUserPatient(email : string){
    // si el ID es -1 significa que no encontró el usuario
    //let query = "SELECT id_user FROM user WHERE email='" + email + "';";
    let id : number;
    await this.database.executeSql("SELECT id_user FROM user WHERE email='"+email+"';",[])
    .then((res) => {
      if (res.rows.length>0){
        console.log("DFO: obtuvo el id" + res.rows.item(0).id_user)
        id = res.rows.item(0).id_user;
        this.gotId = id;
      } else {
        id = -1;
        this.gotId = id
      }
    }).catch((e) => {
      this.toast.presentToast('Error obteniendo ID: '+ JSON.stringify(e))
      id = -1
      this.gotId = id
    });
  }

  async createPatient(obj : object, id : any) {
    // debe recibir el ID de otra función
    console.log('DFO: creando paciente')
    const values = Object.values(obj);
    let numrun = values[0];
    let dvrun = values[1];
    let pnombre = this.ec.convertStringISO(values[2]);
    let snombre = this.ec.convertStringISO(values[3]);
    let apaterno = this.ec.convertStringISO(values[4]);
    let amaterno = this.ec.convertStringISO(values[5]);
    let tel = values[6];
    let idUser = id;
    // const query = 'INSERT INTO paciente(numrun_paciente, dvrun_paciente, pnombre_paciente, snombre_paciente, apaterno_paciente, amaterno_paciente, tel_paciente, id_user) '+
    // "VALUES(${numrun},'${dvrun}','${pnombre}','${snombre}','${apaterno}','${amaterno}',${tel},${idUser});";
    const query = 'INSERT INTO paciente(numrun_paciente, dvrun_paciente, pnombre_paciente, snombre_paciente, apaterno_paciente, amaterno_paciente, tel_paciente, id_user) '+
    'VALUES(?,?,?,?,?,?,?,?)';
    await this.database.executeSql(query,[numrun,dvrun, pnombre, snombre, apaterno, amaterno, tel, idUser])
    .then(()=>{
      console.log('DFO : paciente creado')
      return true
    }).catch((e) => {
      this.toast.presentToast('Error al insertar Paciente: '+ JSON.stringify(e));
      return false;
    })
  };

  async getPaciente(idUser : number){
    let response = {};
    let query = "SELECT * FROM paciente WHERE id_user ='"+ idUser + "';";
    await this.database.executeSql(query,[])
    .then((res) => {
      if(res.rows.length>0){
        console.log('DFO: paciente existe');
        response = {
          numrun : res.rows.item(0).numrun_paciente,
          dvrun : res.rows.item(0).dvrun_paciente,
          pnombre : res.rows.item(0).pnombre_paciente,
          snombre : res.rows.item(0).snombre_paciente,
          apaterno : res.rows.item(0).apaterno_paciente,
          amaterno : res.rows.item(0).amaterno_paciente,
          tel : res.rows.item(0).tel_paciente,
          id : idUser
        }
        this.storage.setItem('patientLogged', JSON.stringify(response));
      } else {
        console.log('DFO: getPaciente paciente no existe')
      }
    })
  }

  async getScheduledHrs(numrunPaciente : number, estado : number){
    const query = "SELECT cita.id_cita AS id, cita.dia_cita AS dia, cita.mes_cita AS mes, cita.anno_cita AS anno, cita.id_estado, med.pnombre_medico||' '||med.apaterno_medico||' '||med.amaterno_medico as nombre_medico FROM cita_medica cita JOIN medico med ON cita.numrun_medico = med.numrun_medico WHERE numrun_paciente="+numrunPaciente+" AND id_estado="+ estado +";";
    let response = []
    await this.database.executeSql(query,[])
    .then((res) =>{
      if (res.rows.length>0){
        for (let i=0; i< res.rows.length; i++){
          let scheduleHr = {
            idCita : res.rows.item(i).id_cita,
            fecha : res.rows.item(i).dia_cita + "/"+ res.rows.item(i).mes_cita+"/"+res.rows.item(i).dia_cita,
            hora : res.rows.item(i).hora_cita,
            estado : res.rows.item(i).id_estado,
            numrunMedico : res.rows.item(i).numrun_medico
          }
          response.push(scheduleHr);
          console.log('DFO: Hay citas')
        }
        } else {
        console.log('DFO: No hay citas')
      }
      this.storage.setItem('activeSchedule',response)
      //return response
    }).catch(e => console.log('DFO: Error obteniendo lista: '+ JSON.stringify(e)))
  }

  async getSpecialities(){
    let response = [];
    await this.database.executeSql('SELECT * FROM especialidad',[])
    .then((res) =>{
      if (res.rows.length>0){
        for (let i = 0; i< res.rows.length; i++){
          let esp = {
            id : res.rows.item(i).id_esp,
            nombre : res.rows.item(i).nom_esp
          }
          response.push(esp);
        }
      }
      return response;
    }).catch(e => console.log('DFO: Error en obtener especialidades: '+ JSON.stringify(e)))
  }

  getAllMedics(){
    console.log('DFO: obteniendo medicos')
    let response = [];
    return this.database.executeSql("SELECT med.numrun_medico AS numrun, med.dvrun_medico AS dv, med.pnombre_medico||' '||med.apaterno_medico||' '||med.amaterno_medico AS nombre, med.id_esp AS id_esp, esp.nom_esp AS especialidad, med.tiempo_bloque as tiempo_bloque, med.box_medico as box_medico FROM medico med JOIN especialidad esp ON med.id_esp = esp.id_esp WHERE med.id_esp = esp.id_esp;",[])
    .then((res) => {
      if (res.rows.length>0){
        console.log('DFO: Query Passed :'+ res.rows.length)
        for (let i = 0; i<res.rows.length; i++){
          console.log('DFO: '+res.rows.item(i).nombre)
          let medico = {
            numrunMedico : res.rows.item(i).numrun,
            dvrunMedico : res.rows.item(i).dv,
            nombreMedico : res.rows.item(i).nombre,
            idEsp : res.rows.item(i).id_esp,
            especialidad : this.ec.convertStringUTF8(res.rows.item(i).especialidad),
            tiempoBloque : res.rows.item(i).tiempo_bloque,
            boxMedico : res.rows.item(i).box_medico
          }
          response.push(medico);
        }
        // puedo deshacerme de este metodo, pero debo asegurarme de que ya no sea usado en la pagina
        // o cambiar por un observable
        this.storage.setItem('medicos',response)
      }
      //return response;
    }).catch(e => console.log('DFO: Error obteniendo lista de medicos :', JSON.stringify(e)));
  }
  /// METODOS RELACIONADOS A agenda_medica
  getAnoTrimestre(){
    let meses: Array<number> = []
    return this.database.executeSql('SELECT a.id_anno AS id, a.anno AS anno, a.id_trimestre AS id_trimestre, m.id_mes AS mes FROM anno a LEFT JOIN mes m ON a.id_trimestre = m.id_trimestre WHERE m.id_trimestre = a.id_trimestre',[])
    .then(res => {
      if (res.rows.length>0){
        // console.log('DFO: LARGO LISTA: '+res.rows.length)
        for (let i= 0; i<res.rows.length;i++){
          // console.log('DFO: id '+ res.rows.item(i).id)
          // console.log('DFO: anno '+ res.rows.item(i).anno)
          // console.log('DFO: idtrimestre '+ res.rows.item(i).id_trimestre)
          let mes = res.rows.item(i).mes;
          meses.push(mes);
        }
        
        let obj = {
          idAnno : res.rows.item(0).id,
          anno : res.rows.item(0).anno,
          idTrimestre : res.rows.item(0).id_trimestre,
          meses : meses
        }
        this.storage.setItem('annoTrimestre',obj);
      }
    }).catch(e => console.log('DFO: Error al capturar AñoTrimestre: '+JSON.stringify(e)))
  }

  getAgenda(numrun : number, idAnno : number){
    let response = []
    let obj = {
      mes : 0,
      dia : 0,
      horaInicio : "",
      horaTermino : "",
      numrunMedico : 0,
      idAnno : 0
    }
    return this.database.executeSql('SELECT * FROM agenda_medica WHERE numrun_medico=? AND id_anno=?;',[numrun, idAnno])
    .then((res) => {
      if(res.rows.length>0) {
        console.log('DFO: agendas encontradas')
        for(let i=0; i<res.rows.length;i++){
          obj = {
            mes : res.rows.item(i).mes_agenda,
            dia : res.rows.item(i).dia_agenda,
            horaInicio : res.rows.item(i).hora_inicio,
            horaTermino : res.rows.item(i).hora_termino,
            numrunMedico : res.rows.item(i).numrun_medico,
            idAnno : res.rows.item(i).id_anno
          }
          console.log('DFO: empujando '+res.rows.item(i).dia_agenda )
          response.push(obj);
        }
        //console.log()
        this.storage.setItem('agendaLista',response);
      }
    })

  }
  getAgendaWithYear(numrun : number, year : number){
    let response = []
    let obj = {
      mes : 0,
      dia : 0,
      horaInicio : "",
      horaTermino : "",
      numrunMedico : 0,
      idAnno : 0
    }
    return this.database.executeSql('SELECT am.mes_agenda AS mes_agenda, am.dia_agenda AS dia_agenda, am.hora_inicio AS hora_inicio, am.hora_termino AS hora_termino, am.numrun_medico AS numrun_medico, am.id_anno AS id_anno FROM agenda_medica am JOIN anno y ON am.id_anno = y.id_anno WHERE am.numrun_medico=? AND y.anno=? ;',[numrun, year])
    .then((res) => {
      if(res.rows.length>0) {
        console.log('DFO: agendas encontradas')
        for(let i=0; i<res.rows.length;i++){
          obj = {
            mes : res.rows.item(i).mes_agenda,
            dia : res.rows.item(i).dia_agenda,
            horaInicio : res.rows.item(i).hora_inicio,
            horaTermino : res.rows.item(i).hora_termino,
            numrunMedico : res.rows.item(i).numrun_medico,
            idAnno : res.rows.item(i).id_anno
          }
          console.log('DFO: empujando '+res.rows.item(i).mes_agenda)
          response.push(obj);
        }
        //console.log()
        this.storage.setItem('agenda'+numrun,response);
      }
    })
  }
  insertNewAgenda(lista : Array<object>){
    console.log('DFO: guardando agenda');
    let indicator = 0;
    let exists : boolean;
    for(let i = 0; i<lista.length; i++){
      let values = Object.values(lista[i]);
      console.log('DFO: dia_mes '+values)
      this.database.executeSql('SELECT * FROM agenda_medica WHERE mes_agenda=? AND dia_agenda=? AND hora_inicio=? AND hora_termino=? AND numrun_medico=? AND id_anno=?',[values[0],values[1],values[2],values[3],values[4],values[5]])
      .then((res) =>{
        if(res.rows.length>0){
          exists = true
          console.log('DFO agenda existe')
          console.log('DFO UPDATE datos '+values[0]+ ' '+values[1] + ' '+' '+values[2] + ' '+' '+values[3] + ' '+' '+values[4] + ' '+ values[5])
          return this.database.executeSql('UPDATE agenda_medica SET mes_agenda=?, dia_agenda=?, hora_inicio=?, hora_termino=? WHERE numrun_medico=? AND id_anno=? ;',
            [values[0],values[1],values[2],values[3],values[4],values[5]])
            .then(() => {
              this.toast.presentToast('Agenda actualizada '+ i)
            }).catch ((e) => this.toast.presentToast('Ha ocurrido un error al enviar la agenda. '+JSON.stringify(e)));
        } else{
          console.log('DFO:  agenda no existe')
          console.log('DFO INSERT datos '+values[0]+ ' '+values[1] + ' '+' '+values[2] + ' '+' '+values[3] + ' '+' '+values[4] + ' '+ values[5])
          exists = false
          return this.database.executeSql('INSERT INTO agenda_medica(mes_agenda, dia_agenda, hora_inicio, hora_termino, numrun_medico, id_anno) VALUES(?, ?, ?, ?, ?, ?)',
            [values[0],values[1],values[2],values[3],values[4],values[5]])
            .then(() => {
              this.toast.presentToast('Agenda agregada '+ i)
            }).catch ((e) => this.toast.presentToast('Ha ocurrido un error al enviar la agenda. '+JSON.stringify(e)));
        }
      }).catch(e => console.log('DFO: error consultando tabla '+JSON.stringify(e)))
    }
  }
  getCitasMedicasMedico(numrun : number){
    /// entrega todas las citas médicas del doctor si estan activas
    // OJO: no entrega los pacientes a los que pertenece
    // solo entrega si estan activas
    let response = [];
    let obj : CitaMedica;
    return this.database.executeSql('SELECT * FROM cita_medica WHERE numrun_medico=? and id_estado=1 ;',[numrun])
    .then((res) =>{
      if(res.rows.length>0){
        console.log('DFO: citas encontradas');
        for(let i = 0; i<res.rows.length;i++){
          obj = new CitaMedica(res.rows.item(i).mes_cita, res.rows.item(i).dia_cita, res.rows.item(i).anno_cita, res.rows.item(i).hora_cita)
          response.push(obj);
        }
        this.storage.setItem('citas'+numrun,response);
      }
    }).catch(e => console.log('DFO: error al encontrar citas médicas '+ JSON.stringify(e)))
  }

  insertCitaMedica(obj : object){
    let values = Object.values(obj);
    /// debe pasersele un objeto con los datos suficiente de la cita
    return this.database.executeSql('INSERT INTO cita_medica(anno_cita, mes_cita, dia_cita, hora_cita,id_estado, numrun_paciente, numrun_medico) VALUES(?,?,?,?,?,?,?);',
      [values[0],values[1],values[2],values[3],values[4],values[5],values[6],])
      .then(() =>{
        console.log('DFO: cita medica agendada')
      }).catch(e => console.log('DFO: Error agregando cita ',JSON.stringify(e)))
  }

  insertLog(date : string, userId : number, logType : number){
    const query = 'INSERT INTO log'
  }

  /// SOLO POR PROPOSITOS DE TESTING, NO USAR
  getAllUsers(){
    return this.database.executeSql('SELECT COUNT(*) AS count FROM role;',[])
    .then((res) => {
      console.log('DFO: Usuarios registrados :'+ res.rows.item(0).count)
      //return result[0] as number;
    })
  }
}

