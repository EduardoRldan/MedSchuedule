import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-schedule-hours',
  templateUrl: './schedule-hours.page.html',
  styleUrls: ['./schedule-hours.page.scss'],
})
export class ScheduleHoursPage implements OnInit {
setHours : any = [];
hideList : boolean = true;
  constructor(private router : Router, private activatedroute : ActivatedRoute) {
    this.activatedroute.queryParams.subscribe( param => {
      if (this.router.getCurrentNavigation()?.extras.state){
        if (this.router.getCurrentNavigation()?.extras?.state?.['list']){
          this.setHours = this.router.getCurrentNavigation()?.extras?.state?.['list']
        }}});
  }

  ngOnInit() {
    if (this.setHours.length > 0) {
      this.hideList = false;
    }
  }

}
