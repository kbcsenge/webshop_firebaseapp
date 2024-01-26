export class Purchase {
  constructor(customerId: string, date: Date, products: { productId: string; quantity: number }[]) {
    this.products = products;
    this.customerId = customerId;
    this.date = date;
  }

  products: { productId: string; quantity: number }[] = [];
  customerId!: string;
  date!: Date;
}