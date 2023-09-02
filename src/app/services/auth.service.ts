import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiKey: string = 'AIzaSyA8eHLER46b7x9ursUnsJ_tuwvJf48A5t0'

  constructor(private http: HttpClient) { }

  signUp(email: string, password: string): Observable<unknown> {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`, { email, password, returnSecureToken: true })
  }

  // Adding new user to the DB (for creating cart in future)
  setUserId(userId: string) : Observable<unknown>{
   return this.http.put(`https://store-payment-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}.json`, { userId: userId })
  }

  signIn(email: string, password: string): Observable<unknown>{
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`, { email, password, returnSecureToken: true })
  }

}
