import { ToastServiceService } from './toast-service.service';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { take, Observable, Subject } from 'rxjs';
import { ShoppingCart } from '../model/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  shoppingCartCollection!: AngularFirestoreCollection<any>
  cartId: any;
  shoppingCartDocument!: AngularFirestoreDocument<any>;
  shoppingCart!: Observable<any>;
  cartProducts!: any[];
  public totalItems: Subject<number> = new Subject<number>();
  public loading: Subject<boolean> = new Subject<boolean>();

  constructor(private afs: AngularFirestore, private toastService: ToastServiceService) {
    this.shoppingCartCollection = afs.collection<ShoppingCart>('shopping-carts');
    this.cartId = localStorage.getItem('cartId');
    this.shoppingCartDocument = this.afs.doc<ShoppingCart>(`shopping-carts/${this.cartId}`);
    this.getCart();

  }

  private createCart(product: any, productQuantity: number) {
    return this.shoppingCartCollection.add({ dateCreated: new Date(), products: [{ product, quantity: productQuantity }] });

  }


  async createOrUpdateCart(product: any, productQuantity: number, message: string) {
    this.changeStep(true);
    if (!this.cartId) {
      let result = await this.createCart(product, productQuantity);
      localStorage.setItem('cartId', result.id);
      this.cartId = result.id;
      this.changeStep(false);
      this.getCart();
      this.toastService.show( message, {classname: 'bg-success text-light'} );

    }
    else {
      this.updateOrAddToCart(product, productQuantity, message);
    }
  }


  private async updateOrAddToCart(product: any, productQuantity: number, message : string) {
    let cart = this.cartProducts;
    this.changeStep(true);

    if (cart.length !== 0) {
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].product.id === product.id) {
          cart[i].quantity = cart[i].quantity + productQuantity;
          break;
        }
        else if (i === cart.length - 1) {
          cart.push({ product, quantity: productQuantity });
          break;

        }
      }
    }
    else { cart.push({ product, quantity: productQuantity }) }
    this.shoppingCartDocument.update({ products: cart }).then(() => {
      this.cartProducts = cart;
      this.getTotalQuantity(cart);
      this.changeStep(false);
      this.toastService.show( message,  {classname: 'bg-success text-light'}  )
    });
    // this.cartProducts = cart;

  }

  deleteFromCart(product: any) {
    let cart = this.cartProducts;
    this.changeStep(true);

    for (let i = 0; i < cart.length; i++) {
      if (cart[i].product.id === product.id) {
        
          cart.splice(i, 1);
       
      }
    }

    this.shoppingCartDocument.update({ products: cart }).then(() => {
      this.cartProducts = cart;
      this.getTotalQuantity(cart);
      this.changeStep(false);
    });
  }

  getCart() {
    this.shoppingCartDocument = this.afs.doc<ShoppingCart>(`shopping-carts/${this.cartId}`);
    this.shoppingCartDocument.valueChanges().pipe(take(1)).subscribe(data => {
      // console.log(data);
      if (data) {
        this.cartProducts = data.products;
        this.getTotalQuantity(this.cartProducts);

        // console.log(this.cartProducts);
      }
    });
    return this.shoppingCartDocument;
    // return this.subject.asObservable();

  }

  getTotalQuantity(data: any) {
    if (data) {
      let cartData = data;
      let quantity = 0;
      for (let cart of cartData) {
        quantity = quantity + cart.quantity
      }
      // console.log(quantity);
      this.totalItems.next(quantity);
    }
    // else this.totalItems = 0;
  }

  changeStep(value: boolean) {
    this.loading.next(value);
  }

  clearCart(){
    localStorage.clear();
  }

}