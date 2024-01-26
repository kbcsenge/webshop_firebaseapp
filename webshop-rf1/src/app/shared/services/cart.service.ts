import { Injectable } from '@angular/core';
import { Cart } from 'src/app/shared/models/Cart';
import { CartItem } from 'src/app/shared/models/CartItem';
import { Product } from 'src/app/shared/models/Product';
import {CookieService} from "ngx-cookie-service";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import {Purchase} from "../models/Purchase";


@Injectable({
  providedIn: 'root'
})

export class CartService {
  private cart: Cart = new Cart();
  private alredyRun: boolean = false;


  constructor(private cookieService: CookieService, private firestore: AngularFirestore) {
  }

  addToCart(product: Product): void {
    let cartItem = this.cart.items.find(item => item.product.productId === product.productId);
    if (cartItem) {
      this.changeQuantity(product.productId, cartItem.quantity + 1);
      return;
    }
    this.cart.items.push(new CartItem(product));
    this.addCookie();
  }

  removeFromCart(productId:string): void {
    this.cart.items =
      this.cart.items.filter(item => item.product.productId != productId);

  }

  changeQuantity(productId: String, quantity: number) {
    let cartItem = this.cart.items.find(item => item.product.productId === productId);
    if (!cartItem) return;
    cartItem.quantity = quantity;
    this.addCookie()
  }

  getCart(): Cart {
    return this.cart;
  }

  addCookie() {
    this.cookieService.deleteAll();
    let id = "";
    let productid = "";
    let quantity = "";
    for (let i = 0; i < this.cart.items.length; i++) {
      id += this.cart.items[i].cardId + ";"
      productid += this.cart.items[i].product.productId + ";"
      quantity += this.cart.items[i].quantity + ";"
    }
    this.cookieService.set("Id", id);
    this.cookieService.set("productId", productid);
    this.cookieService.set("quantity", quantity);


  }

  reloedCookie(items: Product[]) {
    if ( this.cart.items.length<=0) {
      let id = this.cookieService.get("Id");
      console.log(id)
      let productId = this.cookieService.get("productId");
      console.log(productId)
      let quantity = this.cookieService.get("quantity");
      console.log(quantity);
      let idt = id.split(";");
      let productidt = productId.split(";")
      let quantityt = quantity.split(";")
      for (let i = 0; i < idt.length; i++) {
        let product = items.find(item => productidt[i] == item.productId);
        let item
        if (product) {
          item = new CartItem(product);
          item.quantity = Number(quantityt[i]);
          item.cardId = Number(idt[i])
          this.cart.items.push(item)
        }
      }
      this.alredyRun = true;
    }
    console.log(items)
    console.log(this.cart);
  }

  removeAllCart() {
    this.cart=new Cart();
    this.cookieService.delete("Id")
    this.cookieService.delete("productId")
    this.cookieService.delete("quantity")

  }
  createPurchase(user:firebase.default.User | null) {
    if(!user){
      return
    }
    const productsArray: { productId: string; quantity: number }[] = [];

    for (let i = 0; i < this.cart.items.length; i++) {
        productsArray.push({
          productId: this.cart.items[i].product.productId.toString(),
          quantity: this.cart.items[i].quantity, // Assuming quantity is always 1, adjust as needed
        });
    }

    console.log("purchase")
    const purchase = new Purchase(user.uid, new Date(), productsArray);

    this.firestore.collection<Purchase>('Purchases').add({ ...purchase });

    return;
  }
}
