import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-btn-back',
  templateUrl: './btn-back.component.html',
  styleUrls: ['./btn-back.component.scss'],
})
export class BtnBackComponent  implements OnInit {
  @Input() page : string = "";

  constructor(private router : Router) { }

  ngOnInit() {}
  goBack(pageLink : string) {
    this.router.navigate([pageLink]);
  }
}
