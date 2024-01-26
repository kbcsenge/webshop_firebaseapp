import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/User';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService,  private userSevice : UserService, private router: Router) {}

  signUp() {
      this.authService.signup( this.email,this.password).then(cred =>{
          const user: User = {
          userId: cred.user?.uid as string,
          email: this.email,
          isAdmin: false,
          }
          this.userSevice.create(user).then(_ =>{
            console.log('User added succesfully.')
          }). catch(error => {
            console.error(error); 
          });
        }).catch(error => {
          console.error(error);
          this.errorMessage = 'An unknown error occurred.';

        });
      
      // User successfully signed up


  }
  toLogin(){
    this.router.navigate(["/login"]);
  }

}
