import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartItem } from '../models/CartItem.model';
import { Observable, tap } from 'rxjs';
import { Cart } from '../models/Cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  userId = localStorage.getItem('id')

  constructor(private http: HttpClient) { }

  addToCart(newProductId: string, newProductName: string, newQuantity: number, newProductPrice: number, newImageUrl:string): Observable<CartItem> {
    return this.http.put<CartItem>(`https://store-payment-default-rtdb.europe-west1.firebasedatabase.app/users/${this.userId}/cart/${newProductId}.json`, {
      productId: newProductId,
      productName: newProductName,
      quantity: newQuantity,
      price: newProductPrice,
      imageUrl: newImageUrl,
    })
  }

  getFromCart(): Observable<Cart> {
    return this.http.get<Cart>(`https://store-payment-default-rtdb.europe-west1.firebasedatabase.app/users/${this.userId}/cart.json`).pipe(tap(i => console.log(i)));
  }
}
