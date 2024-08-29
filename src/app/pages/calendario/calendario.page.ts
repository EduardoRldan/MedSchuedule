import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {
  medicObj : any;
  constructor(private router:Router, private activatedroute:ActivatedRoute) { 
    this.activatedroute.queryParams.subscribe( param => {
      if(this.router.getCurrentNavigation()?.extras.state){
        this.medicObj = this.router.getCurrentNavigation()?.extras?.state?.['medicObj'];
      }
    });
  }

  ngOnInit() {
  }

}
