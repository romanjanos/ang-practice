import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  product: Product = new Product;
  updating: boolean = false;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params =>{
        if (params.id == 0){
          // ha új
        }
        else
          this.productService.getOneById(params.id).subscribe(
            item => {
              this.product = item;
            })
      }
    )
  }


  onFormSubmit(form: NgForm, element: Product): void {
    try {
      if (element.id == 0) {
        this.productService.create(element).subscribe(
          () => this.router.navigate(['/products'])
        );
      }
      else {
        this.productService.update(element).subscribe(
          () => this.router.navigate(['/products'])
        );
      }
    } catch (error) {
      
    }
  }

}