import { ToastServiceService } from './../services/toast-service.service';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { SortColumn } from './../sortable.directive';
import { DataTableService } from './../services/data-table.service';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../services/category.service';
import { delay, Observable, take, map } from 'rxjs';
import { ProductService } from './../services/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../model/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  products!: Product[];
  categories$!: Observable<any[]>;
  id: any;
  filteredProducts!: Product[];
  sortedProducts!: Product[];
  sortDirection!: any;
  sortColumn!: any;
  sortByMethod: any;
  loading!: boolean;

  sorting = [
    {
      sortBy: 'Name: A to Z',
      column: 'productName',
      direction: 'asc'
    },
    {
      sortBy: 'Price: Low to High',
      column: 'price',
      direction: 'asc'
    },
    {
      sortBy: 'Price : High to Low',
      column: 'price',
      direction: 'dsc'
    }

  ]
  totalItems: number = 0;

  constructor(private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private datatableService: DataTableService,
    private shoppingCartService: ShoppingCartService,
    public cartService: ShoppingCartService,
    public toastService: ToastServiceService) {
    this.route.queryParamMap.subscribe(c => {
      this.id = c.get('category');
      this.sortColumn = c.get('c')
      this.sortDirection = c.get('s');
      this.sortByMethod = c.get('m');
    })

    this.cartService.loading.subscribe(val => this.loading = val);


  }

  ngOnInit() {
    this.productService.getAllProducts().pipe(take(1)).subscribe(data => {
      this.products = data;
      this.filteredProducts = data;
      this.sortedProducts = data;
      this.filterByCategory(this.id);
    })

    this.categories$ = this.categoryService.getCategory();

  }

  filterByCategory(category?: any) {
    if (category) {
      this.filteredProducts = this.products.filter(c => c.category.toLowerCase().includes(category.toLowerCase()))
    }
    else this.filteredProducts = this.products;
    this.sortProducts(this.sortColumn, this.sortDirection);
  }

  sortProducts(column: any, direction: any, sortBy?: any,) {
    if (sortBy) this.sortByMethod = sortBy;
    this.sortColumn = column;
    this.sortDirection = direction;
    this.sortedProducts = this.datatableService.sort(this.filteredProducts, column, direction);
  }


  addToCart(product: any, productQuantity: any) {
    this.shoppingCartService.createOrUpdateCart(product, parseInt(productQuantity), 'Product Added Successfully')

  }

  // deleteFromCart(product: any) {
  //   this.cartService.removeFromCart(product);

  // }

  incrementQuantity(product: Product){
    if(!product.quantity) product.quantity = 1;
    product.quantity++;
    
  }
  decrementQuantity(product: Product){
    if(product.quantity)
    product.quantity--;
  }
 

}
