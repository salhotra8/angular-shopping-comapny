import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
// signUpForm!: FormGroup;
  constructor(private auth: AuthenticationService ) { }

  signUpd = {name: '', email: '', password:'', confirmPassword:''};

  ngOnInit(): void {}


  signUp(name: string, email: string , password: string){
    this.auth.signUpWithEmailAndPassword(name, email, password);
  }

}
