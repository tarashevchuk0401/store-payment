import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  constructor(private authorization :AuthService, private snackBar: MatSnackBar, private router:Router){}

  // Sign Up , set email/password to firebase Authorization and setUserId in RealtimeDataBase
  signUp(form: NgForm):void{
    this.authorization.signUp(form.value.email, form.value.password).subscribe( (d:any) =>{
      this.snackBar.open('Sign up successful', 'ok', {duration: 2000});
      this.authorization.setUserId(d.localId).subscribe();
      localStorage.setItem('id', d.localId );
      this.router.navigate(['home']);
    })
  }

  signIn(form: NgForm):void{
    this.authorization.signIn(form.value.email, form.value.password).subscribe((d:any)=> {
      this.snackBar.open('Sign in successful', 'ok', {duration: 2000});
      this.router.navigate(['home']);
      localStorage.setItem('id', d.localId );
    })
  }

}
