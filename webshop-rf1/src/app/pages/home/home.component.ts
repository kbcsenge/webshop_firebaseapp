import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/Product';
import { ProductService } from 'src/app/shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  products: Product[] = [];

  constructor (private productService: ProductService, private route:ActivatedRoute, private cartServive: CartService){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['searchTerm']) {
        const searchTerm = params['searchTerm'].toLowerCase();
        this.productService.getAllProductBySearchTerm(searchTerm).subscribe(products => {
          products.forEach(product => {
            this.productService.getProductImageUrl(product.imageUrl).subscribe(url => {
              product.imageUrl = url;
            });
          });
          this.products = products;
        });
      } else if(params['tag']){
        const tag = params['tag'];
        this.productService.getAllProductByTag(tag).subscribe(products => {
          products.forEach(product => {
            this.productService.getProductImageUrl(product.imageUrl).subscribe(url => {
              product.imageUrl = url;
            });
          });
          this.products = products;
        });
      }else{
              (
        this.productService.getAllProducts().subscribe(products => {
          products.forEach(product => {
            this.productService.getProductImageUrl(product.imageUrl).subscribe(url => {
              product.imageUrl = url;
            });
          });
          this.products = products;
          this.cartServive.reloedCookie(this.products);
        }));
      }

      }
    )
  }
}
