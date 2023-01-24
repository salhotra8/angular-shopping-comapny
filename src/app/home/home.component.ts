import { ShoppingCartService } from './../services/shopping-cart.service';
import { DataTableService } from './../services/data-table.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from './../services/category.service';
import { Observable, take } from 'rxjs';
import { ProductService } from './../services/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../model/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
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
      sortBy: 'Relevance',
      column: 'productName',
      direction: ''
    },

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

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private datatableService: DataTableService,
    private shoppingCartService: ShoppingCartService,
    private cartService: ShoppingCartService,
    private router: Router) {

    this.route.queryParamMap.subscribe(c => {
      this.id = c.get('category');
      this.sortColumn = c.get('c')
      this.sortDirection = c.get('s');
      this.sortByMethod = c.get('m');
      if (!this.sortByMethod) this.sortByMethod = 'Relevance';
    })

    this.cartService.loading.subscribe(val => this.loading = val);
  }

  ngOnInit() {
    this.productService.getAllProducts().pipe(take(1)).subscribe(data => {
      this.products = data;
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

    this.sortProducts(this.sortColumn, this.sortDirection, this.sortByMethod, this.filteredProducts);
  }

  sortProducts(column: any, direction: any, sortBy: any, products: any = this.filteredProducts) {
    this.sortByMethod = sortBy;
    this.sortColumn = column;
    this.sortDirection = direction;
    this.sortedProducts = this.datatableService.sort(products, column, direction);

  }
  navigation(sortColumn: any, sortDirection: any, sortByMethod: any) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        s: sortDirection || null,
        c: sortColumn,
        m: sortByMethod
      },
      queryParamsHandling: 'merge',
    });
  }

  addToCart(product: any, productQuantity: any) {
    this.shoppingCartService.createOrUpdateCart(product, parseInt(productQuantity), 'Product Added Successfully')

  }

  incrementQuantity(product: Product) {
    if (!product.quantity) product.quantity = 1;
    product.quantity++;

  }
  decrementQuantity(product: Product) {
    if (product.quantity)
      product.quantity--;
  }

  ngOnDestroy() {
    this.cartService.loading.unsubscribe;
  }

}
