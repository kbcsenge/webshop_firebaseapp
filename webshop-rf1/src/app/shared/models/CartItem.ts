import { Product } from "./Product";

export class CartItem{
    constructor(product: Product){
        this.product = product;
    }
    cardId: number = 1;
    product: Product;
    quantity: number = 1;

    get price():number{
        return this.product.price * this.quantity;
    }

}
