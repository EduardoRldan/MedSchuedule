import { Component, OnInit } from '@angular/core';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-main-admin-page',
  templateUrl: './main-admin-page.page.html',
  styleUrls: ['./main-admin-page.page.scss'],
})
export class MainAdminPagePage implements OnInit {
  date : number = Date.now()
  accounts : number = 0;
  sessions : number = 0;
  totalLogs : number = 0;
  logsList : any = [];
  constructor(private bd : ServicebdService) { }

  ngOnInit() {
    this.loadAccounts();
    this.loadLogs();
  }

  async loadAccounts(){
    await this.bd.getAllUsers()
    .then(res => {
      this.accounts = res;
    })
  }

  loadLogs(){
    this.bd.getLogs().subscribe( data => {
      this.logsList = data;
      this.totalLogs = this.logsList.length
      this.accountSessions();
    }, error => console.log('DFO: error obteniendo datos '+JSON.stringify(error)))
  }

  accountSessions(){
    for(let i = 0;i<this.logsList.length;i++){
      let values = Object.values(this.logsList[i]);
        if (values[6]==2){
          this.sessions+=1
        }
    }
  }


}
