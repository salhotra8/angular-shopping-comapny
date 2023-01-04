import { Router } from '@angular/router';
import { Product } from './../model/product';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

   productsCollection: AngularFirestoreCollection<Product>;
  private productDocument!: AngularFirestoreDocument<Product>;
  private productList!: Observable<Product[]>
  public productListArray: Product[] = [];

  constructor(private afs: AngularFirestore,
    private router: Router,
    private modalService: NgbModal) {

    this.productsCollection = afs.collection<Product>('products');

  }

  addProduct(product: Product, content: any) {
    this.productsCollection.add(product).then(() => {
      this.openModal(content);
      this.router.navigate(['admin/product']);
    });

  }
  updateProduct(id: string, product: Product, content: any) {

    this.productDocument = this.afs.doc(`products/${id}`);
    this.productDocument.update(product).then(() => {
      this.openModal(content);
      this.router.navigate(['admin/product']);
    });
  }

  getAllProducts() {
    return this.productList = this.productsCollection.snapshotChanges()
      .pipe(map(actions => actions.map(a => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data();

        return { id, ...data };
      })))

  }

  getProduct(id: string) {
    this.productDocument = this.afs.doc<Product>(`products/${id}`);
    return this.productDocument.valueChanges();

  }

  deleteProduct(id: string) {
    this.afs.doc(`products/${id}`).delete();
  }


  openModal(content: any) {
    this.modalService.open(content)
  }


}
