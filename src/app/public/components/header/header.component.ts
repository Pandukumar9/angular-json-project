import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatashareService } from '../../providers/datashare.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public userService:DatashareService, private router:Router) { }
  islogined:any= false;
  ngOnInit() {
     this.userService.isuserLogged.subscribe(res => {
      console.log(res);
      this.islogined = res;
     })
   const data = localStorage.getItem('user');
   data? this.islogined = true : this.islogined = false ;
  }


  logout(){
    this.userService.user = undefined;
    localStorage.clear();
    this.userService.isuserLogged.next(false);
    this.router.navigate(['/register']);
  }

}
