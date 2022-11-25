import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../services/category.service';
import { Product } from './../model/product';
import { ProductService } from './../services/product.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Component, OnInit} from '@angular/core';
import { Observable, } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  category!: Observable<any>;
  subCategory!: Observable<any>;
  id: any;
  product!: any;
  

  constructor(
    public afs: AngularFirestore,
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.category = this.categoryService.getCategory();
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id)
      this.productService.getProduct(this.id).subscribe((product:any) => {
        this.product = product;
        this.showSubCategory(this.product.category)
      });
  }

  showSubCategory(uid: string) {
    this.subCategory = this.categoryService.getSubCategory(uid);

  }


  saveProduct( product: Product, content: any) {
    if(!this.id) 
    {this.productService.addProduct(product, content);}

    else {
    this.productService.updateProduct(this.id, product, content)}
  }
  
  // updateProduct(id: string, product: Product){
  //   this.productService.updateProduct(id, product);
  // }


}
