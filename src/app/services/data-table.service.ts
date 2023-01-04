import { ProductService } from './product.service';
import { Injectable, PipeTransform } from '@angular/core';
import { BehaviorSubject, debounceTime, delay, Subject, switchMap, tap } from 'rxjs';
import { Product } from '../model/product';
import { SortColumn, SortDirection } from '../sortable.directive';
import { DecimalPipe } from '@angular/common';



@Injectable({
  providedIn: 'root'
})
export class DataTableService {

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _products$ = new BehaviorSubject<Product[]>([]);

  public _state = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
  };


  constructor(private pipe: DecimalPipe) {
    // this._search$
    //   .pipe(
    //     tap(() => this._loading$.next(true)),
    //     debounceTime(200),
    //     // switchMap(() => this.matches()),
    //     delay(200),
    //     tap(() => this._loading$.next(false)),
    //   )
    //   .subscribe((result: any) => {
    //     this._products$.next(result.countries);
    //   });

    // this._search$.next();
  }


  get page() {
    return this._state.page;
  }
  get pageSize() {
    return this._state.pageSize;
  }
  get loading$() {
    return this._loading$.asObservable();
  }
  get searchTerm() {
    return this._state.searchTerm;
  }


  set page(page: number) {
    this._state.page = page;
  }
  set pageSize(pageSize: number) {
    this._state.pageSize = pageSize;
  }
  set sortColumn(sortColumn: SortColumn) {
    this._state.sortColumn = sortColumn;
  }
  set sortDirection(sortDirection: SortDirection) {
    this._state.sortDirection = sortDirection;
  }
  set searchTerm(searchTerm: string) {
    // console.log(searchTerm);
    this._state.searchTerm = searchTerm;
    // console.log(this._state.searchTerm);
  }



  refreshCountries(productListArray: any) {
    const { pageSize, page } = this._state;

    const productList = productListArray.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return productList;

  }


  sort(products: any[], column = this._state.sortColumn, direction: string = this._state.sortDirection): any[] {

    const compare = (v1: string | any, v2: string | any) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);
    if (direction === '' || column === '') {
      return products;
    } else {
      return [...products].sort((a, b) => {
        const res = compare(a[column as keyof typeof a], b[column as keyof typeof b]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  search(product: Product[], term: string = this._state.searchTerm, pipe: PipeTransform = this.pipe) {
    const data = product.filter(p => {
     return p.productName.toLowerCase().includes(term.toLowerCase()) ||
      pipe.transform(p.price).includes(term) ||
      p.category.toLowerCase().includes(term.toLowerCase())
    });
    return data;
  }




}
