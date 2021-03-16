import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  @Input() products: Product[] | null = [];
  @Output() delete: EventEmitter<Product> = new EventEmitter();

  newProduct: Product = new Product();

  constructor() { }

  ngOnInit(): void {
  }

  onDelete(product: Product):void {
    this.delete.emit(product);
  }
 
}
