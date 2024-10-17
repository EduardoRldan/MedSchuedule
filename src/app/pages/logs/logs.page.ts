import { Component, OnInit } from '@angular/core';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.page.html',
  styleUrls: ['./logs.page.scss'],
})
export class LogsPage implements OnInit {
  logsList : any;
  constructor(private bd : ServicebdService) { 
    this.loadLogs();
  }

  ngOnInit() {
  }

  loadLogs(){
    this.bd.getLogs().subscribe( data => {
      this.logsList = data;
      
    }, error => console.log('DFO: error obteniendo datos '+JSON.stringify(error)))
  }

}
