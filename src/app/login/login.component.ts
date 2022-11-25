import { UserService } from './../services/user.service';
import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public auth: AuthenticationService, public router: Router,
    ) { }

  ngOnInit(): void {
  }
  loginWithGoogle() {
    this.auth.loginWithGoogle()
  }

  login(email: string, password: string) {
    this.auth.signIn(email, password)
  }
}


