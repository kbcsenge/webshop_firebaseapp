import { Component } from '@angular/core';
import {CartService} from "../../shared/services/cart.service";
import {Cart} from "../../shared/models/Cart";
import {CartItem} from "../../shared/models/CartItem";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import { Customer } from 'src/app/shared/models/Customer';
import { CustomerService } from 'src/app/shared/services/customer.service';
import {ProductService} from "../../shared/services/product.service";
import {ActivatedRoute} from "@angular/router";
import {Product} from "../../shared/models/Product";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent {
  cart!:Cart;
  fuser: firebase.default.User | null = null;
  customer: Customer | null = null;
  isCustomer: boolean = false;
  products:Product[]=[];

  constructor(private cartService: CartService,private afAuth: AngularFireAuth, private customerService: CustomerService, private productService: ProductService, private cartServive: CartService){
    this.setCart();
  }
  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') as string);
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.fuser = user;
        this.customerService.getCustomerbyId(this.fuser.uid).subscribe((customer) => {
          if (customer) {
            this.customer = customer;
            this.isCustomer = true;
        }
      });
    }
  });
    this.productService.getAllProducts().subscribe(products => {
      products.forEach(product => {
        this.productService.getProductImageUrl(product.imageUrl).subscribe(url => {
          product.imageUrl = url;
        });
      });
      this.products = products;
});
    console.log(this.customer)
    console.log(this.cart);
  }


  removeFromCart(cartItem:CartItem){
    this.cartService.removeFromCart(cartItem.product.productId);
    this.setCart();
  }

  changeQuantity(cartItem:CartItem, quantityInString: string){
    const quantity = parseInt(quantityInString);
    this.cartService.changeQuantity(cartItem.product.productId, quantity);
    this.setCart();
    console.log(`Changing quantity of tool ${cartItem.product.productId} to ${quantity}`);

  }

  setCart(){
    this.cart = this.cartService.getCart();
  }
  checkout(){
    if(this.isCustomer){
       if (confirm("Do you want to finalize the order?") == true) {
      this.cartService.createPurchase(this.fuser);
      this.cartService.removeAllCart();
      this.setCart()
      alert("Successful order.")
         console.log("order")

    } else {
    }
    } else{
      alert("Become a Customer to be able to place an order")
    }

    console.log(this.cart); // log the cart object to the console
    console.log(this.cart.items);
    console.log()
  }

}
