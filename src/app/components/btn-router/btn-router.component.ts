import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-btn-router',
  templateUrl: './btn-router.component.html',
  styleUrls: ['./btn-router.component.scss'],
})
export class BtnRouterComponent  implements OnInit {
  @Input() label: string = "";
  @Input() page : string = "";
  @Input() icon : string = "";
  @Input() dataToSend : any;
  iconPresent : boolean = false;

  constructor(private router : Router) { }

  ngOnInit() {
    if(this.icon != ""){
      this.iconPresent = true;
    }
  }

  goToPage(link : string){
    if (this.dataToSend){
      let navExtras : NavigationExtras = this.dataToSend;
      this.router.navigate([link],navExtras)
    } else {
      this.router.navigate([link]);
    }
  }
}
