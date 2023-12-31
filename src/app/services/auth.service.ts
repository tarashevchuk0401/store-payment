import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiKey: string = 'AIzaSyA8eHLER46b7x9ursUnsJ_tuwvJf48A5t0'

  constructor(private http: HttpClient) { }

  signUp(email: string, password: string): Observable<unknown> {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`, { email, password, returnSecureToken: true })
      .pipe(catchError(this.getErrorHandler));

  }

  setUserId(userId: string) {
    console.log('set')
    return this.http.put(`https://store-payment-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}.json`, { userId: userId })
  }

  signIn(email: string, password: string): Observable<unknown> {
    return this.http.post<User>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`,
      { email, password, returnSecureToken: false }
    ).pipe(tap(i => console.log(i)), catchError(this.getErrorHandler));
  }

  getErrorHandler(errorRes: HttpErrorResponse): Observable<unknown> {
    let errorMessage = 'Invalid email or password'
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => new Error(errorMessage));
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'Email already exist';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Email not found';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid password';
        break;
      case 'INVALID_EMAIL':
        errorMessage = 'Invalid email';
        break;
    }
    return throwError(() => new Error(errorMessage));
  }

}
