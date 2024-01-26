import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Customer } from 'src/app/shared/models/Customer';
import { Review } from 'src/app/shared/models/Review';
import { User } from 'src/app/shared/models/User';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { ReviewService } from 'src/app/shared/services/review.service.ts.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit{

  @Input() comment: Review | null = null;
  public username:string = "Deleted customer";
  public isAdmin:boolean;

  constructor( private userService:UserService,
    private customerService: CustomerService,
    private reviewService:ReviewService
    ){
    
    
    this.isAdmin = localStorage.getItem('isAdmin') === 'true';
    
    
  }



  ngOnInit(): void {
    let user:User | undefined = undefined;

    if(this.comment?.customerId){
      this.userService.getUserById(this.comment?.customerId).subscribe(result => {
        user = result;
        
        if(user){
          let customer:Customer | undefined = undefined;
          this.customerService.getCustomerbyId(user.userId).subscribe( customerEntry => {
            customer = customerEntry;
            if (customer) {
              this.username = `${customer.customerName.firstName}  ${customer.customerName.lastName}`
              
            }
          });
          
        } 
      })
      
    }
  }

  

  deleteComment():void{
    if (this.comment) {
      this.reviewService.deleteReview(this.comment.id);
    }
    

    //this.host.nativeElement.remove();
  }


}
