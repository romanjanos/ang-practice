import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product';
import { ProductService } from '../../service/product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  productList$: Observable<Product[]> = this.productService.productList$;

  // Filter
  filterPhrase: string = '';
  filterKey: string = 'name';

  // Sorter
  sortby: string = 'id';
  sorterDirection: number = 0;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAll(); 
  }

  deleteItem(product: Product): void {
    this.productService.remove(product).subscribe(
      () => {
        this.productService.getAll();
      }
    );
  }

  changeOrder(param: string): void {
    if (this.sortby === '' || this.sortby != param) {
      this.sorterDirection = 1;
    }
    if (this.sortby === param) {
      if (this.sorterDirection === 1) this.sorterDirection = 2;
      else this.sorterDirection = 1;
    }
    this.sortby = param;
  }

}