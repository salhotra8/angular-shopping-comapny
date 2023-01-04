import { onSnapshot } from 'firebase/firestore';
import { Observable, take } from 'rxjs';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isMenuCollapsed = true;
  totalItems!: number;


  constructor(public auth: AuthenticationService,
    public userService: UserService,
    public cartService: ShoppingCartService) {
  }

  ngOnInit() {
   this.cartService.totalItems.subscribe( val => this.totalItems = val);

  }


  logout() {
    this.auth.logout();
  }

  getQuantity(){
    // let totalItems = (this.cartService.cartProducts) 
    // return (this.cartService.totalItems ? this.cartService.totalItems : 0)
  }


}
