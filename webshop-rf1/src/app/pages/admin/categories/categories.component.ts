import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/Product';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit{
  products: Product[] = [];
  categories: Set<string> = new Set();
  constructor (private productService: ProductService){}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;

      products.forEach(element => {
        element.tags?.forEach(tag => {
          this.categories.add(tag);
        });
      });
  })}

}
