import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Customer } from 'src/app/shared/models/Customer';
import { Product } from 'src/app/shared/models/Product';
import { Purchase } from 'src/app/shared/models/Purchase';
import { PurchasedProduct } from 'src/app/shared/models/purchasedProduct';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { PurchaseService } from 'src/app/shared/services/purchase.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  purchases: Purchase[] = [];
  products: Product[] = [];
  purchasedProducts: PurchasedProduct[] = [];
  user: firebase.default.User | null = null;
  isCustomer: boolean = false;
  customer: Customer | null = null;

  firstName: string = '';
  lastName: string = '';
  homeAddress: string = '';
  phoneNumber: string = '';

  constructor(private userService: UserService,
    private purchaseService: PurchaseService,
    private authService: AuthService,
    private afAuth: AngularFireAuth,
    private productService: ProductService,
    private customerService: CustomerService) { 

    }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') as string);
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.user = user;
        // Retrieve customer information based on the user's UID
        this.customerService.getCustomerbyId(this.user.uid).subscribe((customer) => {
          // Handle the case when customer is undefined
          if (customer) {
            this.customer = customer;
            this.isCustomer = true;
            console.log(this.customer);

            this.firstName = this.customer.customerName.firstName;
            this.lastName = this.customer.customerName.lastName;
            this.homeAddress = this.customer.homeAdress;
            this.phoneNumber = this.customer.phoneNumber;
          } else {
            console.warn('Customer not found.');
          }
        });
        if(!this.customer){
          // Set customer information fields
          
        console.log("Dasdasdasdsa")
          // Retrieve purchases for the logged-in user
        this.purchaseService.getPurchasesByCustomerId(this.customer!.customerId).subscribe((purchases) => {
          this.purchases = purchases;

          // Iterate over purchases and retrieve product information
          this.purchases.forEach((purchase) => {
/*             this.productService.getProductById(purchase.productId).subscribe((product) => {
              if (product) {
                // Retrieve product image URL
                this.productService.getProductImageUrl(product.imageUrl).subscribe((downloadUrl) => {
                  // Update product information with image URL
                  product.imageUrl = downloadUrl;

                  // Push the purchased product into the array
                  this.purchasedProducts.push({
                    imageUrl: product.imageUrl || '',
                    productName: product.productName || '',
                    date: purchase.date
                  });
                });
              }
            }); */
          });
        });
        }
        
      }
    });  
  }
  becomeCustomer():void{
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        const newCustomer: Customer = {
          customerId: user.uid, 
          userId: user.uid,
          customerName: {
            firstName: this.firstName, 
            lastName: this.lastName,  
          },
          homeAdress: this.homeAddress,  
          phoneNumber: this.phoneNumber,     
        };
        console.log(newCustomer)

        this.customerService.create(newCustomer).then(() => {
          console.log('Customer created successfully!');
          this.customer = newCustomer;
        }).catch((error) => {
          console.error('Error creating customer:', error);
        });
      }
    });
   
  }
  deleteCustomer(){
    this.customerService.deleteCustomerById(this.customer!.customerId).then(() => {
      console.log('Customer deleted successfully!');
      this.isCustomer = false;
    }).catch((error) => {
      console.error('Error deleting customer:', error);
    });
  }


  updateCustomer(){
    if (this.customer) {
        this.customer.customerName.firstName = this.firstName;
        this.customer.customerName.lastName = this.lastName;
        this.customer.homeAdress = this.homeAddress;
        this.customer.phoneNumber = this.phoneNumber;

        this.customerService.updateCustomer(this.customer);
    }
  }
}
