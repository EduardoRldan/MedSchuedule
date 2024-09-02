import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.page.html',
  styleUrls: ['./main-page.page.scss'],
})
export class MainPagePage implements OnInit {
  date : number = Date.now();
  user : any;
  setHours : any = [];
  constructor(private router:Router, private activatedroute : ActivatedRoute) { 
    this.activatedroute.queryParams.subscribe( param => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.user = this.router.getCurrentNavigation()?.extras?.state?.['user']
        if (this.router.getCurrentNavigation()?.extras?.state?.['dateSaved']){
          this.setHours.push(this.router.getCurrentNavigation()?.extras?.state?.['dateSaved'])
        }
      }
    })
  }

  ngOnInit() {
  }
  goToPage(route:string){
    let navExtras : NavigationExtras = {
      state : {
        user : this.user
      }
    }
    this.router.navigate([route],navExtras);
  }
  goToSchedule(route : string,hourList : any){
    let navExtras : NavigationExtras = {
      state : {
        list : hourList
      }
    }
    this.router.navigate([route],navExtras);
  }
}
