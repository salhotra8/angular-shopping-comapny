import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isMenuCollapsed = true;

  constructor(public auth : AuthenticationService,
    public userService : UserService ) {
  }

  ngOnInit(): void {
  }
logout(){
  this.auth.logout();

}
}
