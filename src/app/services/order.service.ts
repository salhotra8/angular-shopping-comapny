import { ShoppingCartService } from './shopping-cart.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orderCollection!: AngularFirestoreCollection<any> 

  constructor(private afs: AngularFirestore, 
    private modalService : NgbModal,
    private cartService : ShoppingCartService ) { 
    this.orderCollection =  this.afs.collection('/orders');
  }

  placeOrder(orderDetails: any, content: any){
    this.orderCollection.add(orderDetails).then(() => {
      this.modalService.open(content);
      this.cartService.clearCart();
    })
  }


}
