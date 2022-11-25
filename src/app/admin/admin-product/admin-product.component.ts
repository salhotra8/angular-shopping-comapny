import { NgbdSortableDirective, SortEvent, SortColumn, SortDirection } from './../../sortable.directive';
import { DataTableService } from './../../services/data-table.service';
import { Product } from './../../model/product';
import { ProductService } from './../../services/product.service';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { TitleStrategy } from '@angular/router';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit {

  // total$: Observable<number>;
  productList: Product[] = [];
  productListPaginate: Product[] = [];
  productListSorted: Product[] = []
  productListFiltered : Product[] = []; 
 

  @ViewChildren(NgbdSortableDirective) headers!: QueryList<NgbdSortableDirective>;

  constructor(private productService: ProductService,
    public datatableService: DataTableService) {  } 
  


  ngOnInit() {

    this.productService.getAllProducts().subscribe(data => {
      this.productList = data;
        this.productListFiltered = data;
      this.productListSorted = data;
      this.refreshCountries();
      
    });

  }


  delete(id: any) {
    this.productService.deleteProduct(id);
  }

  refreshCountries() {
    this.productListPaginate = this.datatableService.refreshCountries(this.productListSorted);

  }

  onSort({ column, direction }: SortEvent) {

    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.datatableService.sortColumn = column;
    this.datatableService.sortDirection = direction;
    this.productListSorted = this.datatableService.sort(this.productListFiltered);
    this.refreshCountries();


  }
filter(){ 
  const column = this.datatableService._state.sortColumn as typeof this.datatableService.sortColumn;
  const direction =  this.datatableService._state.sortDirection as typeof this.datatableService.sortDirection;
  this.productListFiltered = this.datatableService.search(this.productList);
  this.onSort({column, direction});
  this.refreshCountries();

}




}
