import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthenticationService } from './../services/authentication.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ShoppingCart } from './../model/shopping-cart';
import { ProductService } from './../services/product.service';
import { Observable, take } from 'rxjs';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { Component, OnInit, Output } from '@angular/core';
import { Product } from '../model/product';
import { outputAst } from '@angular/compiler';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  @Output() cartItems: any[] = [];
  totalItems: number = 0;
  loading!: boolean;
  totalPrice: number = 0;
  isGuest: boolean = false;
  user: any;


  constructor(private cartService: ShoppingCartService,
    private auth: AuthenticationService,
    private router: Router,) {

    this.cartService.loading.subscribe(val => this.loading = val);

    this.auth.UserCheck().pipe(take(1)).subscribe((user: any) => {
      if (user) {
        this.user = user;
      }
    })

  }

  ngOnInit(): void {
    this.cartService.shoppingCartDocument.snapshotChanges()
      .subscribe((data: any) => {
        if (data.payload.data()) {
          let cartData: any = data.payload.data();
          this.cartItems = cartData.products;
          let quantity = 0;
          let price = 0;
          for (let cart of this.cartItems) {
            quantity = quantity + cart.quantity;
            price = price + (cart.product.price * cart.quantity);

          }
          this.totalItems = quantity;
          this.totalPrice = price;

          // console.log("subscribe call");
          // this.cartItems.forEach(data => this.totalItems = this.totalItems + data.quantity )
        }

      });

  }

  updateProduct(product: Product, quantity: number) {
    this.cartService.createOrUpdateCart(product, quantity, 'Product Updated Successfully');
  }

  deleteProduct(product: Product) {
    this.cartService.deleteFromCart(product)
  }

  checkout() {
    if (this.isGuest || this.user) this.router.navigate(['/shippingForm']);
    else {
      this.auth.redirectUrl = '/shippingForm';
      this.router.navigate(['/login']);
    }
  }


}
