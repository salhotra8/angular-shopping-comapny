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

  private itemsCollection: AngularFirestoreCollection<Product>;
  private productsCollection: AngularFirestoreCollection<Product>;
  private productDocument!: AngularFirestoreDocument<Product>;
  private productList!:Observable<Product[]>
  public productListArray: Product[]=[];

  constructor(private afs: AngularFirestore,
    private router: Router,
    private modalService: NgbModal) {

    this.itemsCollection = afs.collection<Product>('products');
    this.productsCollection = afs.collection('products');
    // console.log(this.product);
    // console.log(this.product.length);

  }

  addProduct(product: Product, content: any) {
    console.log(product);
    this.itemsCollection.add(product).then(() => {
      this.openModal(content);
      this.router.navigate(['admin/product']);
    });

  }
  updateProduct(id: string, product: Product, content:any) {

    this.productDocument = this.afs.doc(`products/${id}`);
    this.productDocument.update(product).then(() => {
    this.openModal(content);
    this.router.navigate(['admin/product']);
  });
  }

  getAllProducts() {
    this.productList = this.productsCollection.snapshotChanges()
      .pipe(map(actions => actions.map(a => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data();
        
        // this.productListArray.push(data);
        // console.log(this.productListArray);
        
       
        return { id, ...data };
      })))
      // this.productList.subscribe(data => {this.productListArray = data;
      //   console.log(this.productListArray)})
      // console.log(this.productListArray);
      return this.productList;
      

  }

  getProduct(id: string) {
    this.productDocument = this.afs.doc<Product>(`products/${id}`);
    return this.productDocument.valueChanges();

  }

  deleteProduct(id: string) {
    this.afs.doc(`products/${id}`).delete();
  }


  openModal(content:any){
    this.modalService.open(content)
  }


}
