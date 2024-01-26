import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/Product';
import { ProductService } from 'src/app/shared/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewService } from 'src/app/shared/services/review.service.ts.service';
import { Review } from 'src/app/shared/models/Review';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit{


  products: Product[] = [];
  reviews: Review[] = []
  previousReview: Review | undefined = undefined;

  public product:Product | undefined;

  constructor (
    private productService: ProductService,
    private route:ActivatedRoute,
    private afAuth: AngularFireAuth,
    private reviewService:ReviewService,
    private cartService:CartService,
    private router: Router){
    let id:string = this.route.snapshot.paramMap.get('productId')|| "";
    if(id != ""){
      this.productService.getProductById(id).subscribe(
        product =>{
          if(product){
            this.product = product;
            productService.getProductImageUrl(product.imageUrl).subscribe(url=>{product.imageUrl = url});
          }
        });
        this.reviewService.getReviews(id).subscribe(reviews => {
          this.reviews = reviews;

          this.afAuth.authState.subscribe(user => {
            if (user) {
              for (let item of reviews) {
                if (item.customerId == user.uid) {
                  this.previousReview = item;
                  console.log("Previous review (product):" + item);
                }

              }
            }

          });


          console.log(reviews);
        });

    }



  }


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
      }else{
          this.productService.getAllProducts().subscribe(products => {
            products.forEach(product => {
              this.productService.getProductImageUrl(product.imageUrl).subscribe(url => {
                product.imageUrl = url;
              });
            });
            this.products = products;
          });

/*
          const prod: Product= {
              productId: 1,
              productName: 'Iphone 15',
              price: 800,
              tags: ['Mobile', 'Apple','128 Gb'],
              description: 'The iPhone, a flagship product from Apple, is celebrated for its elegant design and premium build quality. It runs on the iOS operating system, known for its stability and vast app ecosystem. Equipped with Retina displays, iPhones offer sharp and vibrant visuals. With powerful A13 Bionic chips (or later), they deliver fast and efficient performance. iPhones are celebrated for their high-quality cameras, Face ID security, and seamless integration into the broader Apple ecosystem, ensuring a user-friendly and technologically advanced smartphone experience.',
              imageUrl: 'products_image/iphone_15.jpg'

          }

 */
          // this.productService.createProduct(prod)
    }
    });
  }

  addCart(){
    for (let i = 0; i < this.products.length; i++) {
      if(this.products[i].productId==this.product?.productId){
        this.cartService.addToCart(this.product);
        break;
      }
    }
    this.router.navigate(['/cart']);
  }

}
