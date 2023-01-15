import { AuthenticationService } from './../services/authentication.service';
import { OrderService } from './../services/order.service';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { states } from '../../assets/states';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit {

  totalPrice!: number;
  states = states;
  cartItems!: any[];
  user: any;

  constructor(private cartService: ShoppingCartService,
     private orderService: OrderService,
     private auth : AuthenticationService) {
    this.cartService.shoppingCartDocument.valueChanges().pipe(take(1)).subscribe((data: any) => {
      if (data) {
        let cartData = data;
        let totalPrice = 0;
        for (let data of cartData.products) {
          totalPrice = totalPrice + (data.product.price * data.quantity);
        }
        this.totalPrice = totalPrice;
        this.cartItems = data.products;
      }
    })

    this.auth.UserCheck().pipe(take(1)).subscribe((user: any) => {
      if (user) {
        this.user = user;
      }
    })
  }

  ngOnInit(): void {
  }

  placeOrder(shippingDetails: any, content: any ){
    let orderDetails = {
      orderDate: new Date,
      items: this.cartItems,
      shippingDetails:  shippingDetails,
      totalPrice : this.totalPrice,
      user: (this.user ? this.user.uid : null)
    }

    this.orderService.placeOrder(orderDetails, content);
  }

  refreshPage(){
    location.href = '/home';
  }

}
