import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  error: string = '';

  constructor(
    private authorization: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private cartService: CartService

  ) { }

  // Sign Up , set email/password to firebase Authorization and setUserId in RealtimeDataBase
  signUp(form: NgForm): void {
    this.authorization.signUp(form.value.email, form.value.password).subscribe((d: any) => {
      this.snackBar.open('Sign up successful', 'ok', { duration: 3000 });
      this.authorization.setUserId(d.localId).subscribe();
      localStorage.setItem('id', d.localId);
      this.cartService.sendQuantityInCart();
      this.router.navigate(['home']);
      window.location.reload();
    },
      (errorMessage) => {
        this.error = errorMessage

      }
    )
  }


  //  IMPLEMENT
  signIn(form: NgForm): void {
    this.authorization.signIn(form.value.email, form.value.password).subscribe((d: any) => {
      this.snackBar.open('Sign in successful', 'ok', { duration: 2000 });
      localStorage.setItem('id', d.localId);
      this.cartService.sendQuantityInCart();
      this.router.navigate(['home']);
      window.location.reload();
    },
      (errorMessage) => {
        this.error = errorMessage
      }
    )
  }



}
