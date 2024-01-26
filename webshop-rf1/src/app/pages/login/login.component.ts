import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoggedIn: boolean = false;
  loggedInUser?: firebase.default.User | null;

  constructor(private router: Router, private authService: AuthService, private userService: UserService){}

  async login(){
    if (this.email && this.password) {
      try {
        const userCredential = await this.authService.login(
          this.email,
          this.password
        );
        this.isLoggedIn = true;
        console.log(userCredential);
        this.errorMessage = '';

        if (userCredential.user) {
          this.userService.getUserById(userCredential.user.uid).subscribe(user => {
            if (user && user.isAdmin) {
              // User is an admin, store this information in localStorage
              localStorage.setItem('isAdmin', 'true');
            } else {
              localStorage.removeItem('isAdmin');

            }
            this.authService.isUserLoggedIn().subscribe(user => {
              console.log(user);
              this.loggedInUser = user;
              localStorage.setItem('user', JSON.stringify(this.loggedInUser))
              this.router.navigateByUrl('/');

            }, error => {
              localStorage.setItem('user', JSON.stringify('null'))
              console.error(error);
            })
          });
        }
      } catch (error) {
        // Handle login errors
        console.error('Unknown error:', error);
        this.errorMessage = 'An unknown error occurred.';
        this.router.navigateByUrl('/login');
        alert("Bad credentials!")
      }
    }
  }

  logout(){
    this.authService.logout()
    localStorage.removeItem('isAdmin');
  }
  signup(){
    this.router.navigate(["/signup"]);
  }

}
