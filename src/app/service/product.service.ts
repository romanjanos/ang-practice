import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl: string = 'http://localhost:3000/products';
  list$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);


  constructor(
    private http: HttpClient
  ) { }

  getAll(): void {
    this.http.get<Product[]>(this.apiUrl).subscribe(
      products => this.list$.next(products)
    );
  }

  remove(product: Product): void {
    this.http.delete<Product>(`${this.apiUrl}/${product.id}`).subscribe(
      () => this.getAll()
    );
  }

  get(product: Product): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${product.id}`);
  }

  create(product: Product): void {
    this.http.post<Product>(this.apiUrl, product).subscribe(
      () => this.getAll()
    );
  }

  update(product: Product): void {
    this.http.patch<Product>(`${this.apiUrl}/${product.id}`, product).subscribe(
      () => this.getAll()
    );
  }


}

