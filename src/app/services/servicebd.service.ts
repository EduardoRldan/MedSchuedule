import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlerttoastService } from './alerttoast.service';
import { ObjectHandlerService } from './object-handler.service';


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
"INSERT OR IGNORE INTO especialidad(nom_esp) VALUES('Medicina General');",
"INSERT OR IGNORE INTO especialidad(nom_esp) VALUES('Kinesiología');",
"INSERT OR IGNORE INTO especialidad(nom_esp) VALUES('Broncopulmonar');",
"INSERT OR IGNORE INTO especialidad(nom_esp) VALUES('Traumatología');",
"INSERT OR IGNORE INTO especialidad(nom_esp) VALUES('Cardiología');",
"INSERT OR IGNORE INTO especialidad(nom_esp) VALUES('Oncología');",
"INSERT OR IGNORE INTO especialidad(nom_esp) VALUES('Otorrinolaringología');",
"INSERT OR IGNORE INTO role(role_name) VALUES('Paciente');",
"INSERT OR IGNORE INTO role(role_name) VALUES('Médico');",
"INSERT OR IGNORE INTO role(role_name) VALUES('Admin');",
"INSERT OR IGNORE INTO estado_cita(nom_estado) VALUES('Activo');",
"INSERT OR IGNORE INTO estado_cita(nom_estado) VALUES('Cancelado');",
"INSERT OR IGNORE INTO estado_cita(nom_estado) VALUES('Finalizado');",
"INSERT OR IGNORE INTO trimestre(nom_trimestre) VALUES('Primer');",
"INSERT OR IGNORE INTO trimestre(nom_trimestre) VALUES('Segundo');",
"INSERT OR IGNORE INTO trimestre(nom_trimestre) VALUES('Tercer');",
"INSERT OR IGNORE INTO trimestre(nom_trimestre) VALUES('Cuarto');",
"INSERT OR IGNORE INTO mes(nom_mes, id_trimestre) VALUES('Enero',1);",
"INSERT OR IGNORE INTO mes(nom_mes, id_trimestre) VALUES('Febrero',1);",
"INSERT OR IGNORE INTO mes(nom_mes, id_trimestre) VALUES('Marzo',1);",
"INSERT OR IGNORE INTO mes(nom_mes, id_trimestre) VALUES('Abril',2);",
"INSERT OR IGNORE INTO mes(nom_mes, id_trimestre) VALUES('Mayo',2);",
"INSERT OR IGNORE INTO mes(nom_mes, id_trimestre) VALUES('Junio',2);",
"INSERT OR IGNORE INTO mes(nom_mes, id_trimestre) VALUES('Julio',3);",
"INSERT OR IGNORE INTO mes(nom_mes, id_trimestre) VALUES('Agosto',3);",
"INSERT OR IGNORE INTO mes(nom_mes, id_trimestre) VALUES('Septiembre',3);",
"INSERT OR IGNORE INTO mes(nom_mes, id_trimestre) VALUES('Octubre',4);",
"INSERT OR IGNORE INTO mes(nom_mes, id_trimestre) VALUES('Noviembre',4);",
"INSERT OR IGNORE INTO mes(nom_mes, id_trimestre) VALUES('Diciembre',4);",
"INSERT OR IGNORE INTO log_type(desc_type) VALUES('Registro de Usuario');",
"INSERT OR IGNORE INTO log_type(desc_type) VALUES('Login Usuario');",
"INSERT OR IGNORE INTO log_type(desc_type) VALUES('Nueva cita médica');",
"INSERT OR IGNORE INTO log_type(desc_type) VALUES('Cancela Cita médica');",
"INSERT OR IGNORE INTO log_type(desc_type) VALUES('Nueva agenda médica');",
"INSERT OR IGNORE INTO log_type(desc_type) VALUES('Modifica agenda médica');",
"INSERT OR IGNORE INTO log_type(desc_type) VALUES('Logout Usuario');",
"INSERT OR IGNORE INTO anno(anno, id_trimestre, active) VALUES(2024,4,1);",
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
    private toast : AlerttoastService) {
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
    let pnombre = values[2];
    let snombre = values[3];
    let apaterno = values[4];
    let amaterno = values[5];
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
    const query = "SELECT * FROM cita_medica WHERE numrun_paciente="+numrunPaciente+" AND id_estado="+ estado +";";
    let response = []
    await this.database.executeSql(query,[])
    .then((res) =>{
      if (res.rows.length>0){
        for (let i=0; i< res.rows.length; i++){
          let scheduleHr = {
            idCita : res.rows.item(i).id_cita,
            anno : res.rows.item(i).anno_cita,
            mes : res.rows.item(i).mes_cita,
            dia : res.rows.item(i).dia_cita,
            hora : res.rows.item(i).hora_cita,
            estado : res.rows.item(i).id_estado,
            numrunMedico : res.rows.item(i).numrun_medico
          }
          response.push(scheduleHr);
        }
        } else {
        console.log('DFO: No hay citas')
      }
      return response
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

  async getAllMedics(){
    console.log('DFO: obteniendo medicos')
    let response = [];
    await this.database.executeSql("SELECT med.numrun_medico AS numrun, med.dvrun_medico AS dv, med.pnombre_medico||' '||med.apaterno_medico||' '||med.amaterno_medico AS nombre, esp.nom_esp AS especialidad FROM medico med JOIN especialidad esp ON med.id_esp WHERE med.id_esp = esp.id_esp;",[])
    .then((res) => {
      if (res.rows.length>0){
        console.log('DFO: Query Passed :'+ res.rows.length)
        for (let i = 0; i<res.rows.length; i++){
          console.log('DFO: '+res.rows.item(i).nombre)
          let medico = {
            numrunMedico : res.rows.item(i).numrun,
            dvrunMedico : res.rows.item(i).dv,
            nombreMedico : res.rows.item(i).nombre,
            especialidad : res.rows.item(i).especialidad
          }
          response.push(medico);
        }
        this.storage.setItem('medicos',response)
      }
      //return response;
    }).catch(e => console.log('DFO: Error obteniendo lista de medicos :', JSON.stringify(e)));
  }

  insertLog(date : string, userId : number, logType : number){
    const query = 'INSERT INTO log'
  }

  /// SOLO POR PROPOSITOS DE TESTING, NO USAR
  async getAllUsers(){
    await this.database.executeSql('SELECT COUNT(*) AS count FROM user;',[])
    .then((res) => {
      console.log('DFO: Usuarios registrados :'+ res.rows.item(0).count)
      return res.rows.item(0).count;
      //return result[0] as number;
    })
  }
}

