import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartItem } from '../models/CartItem.model';
import { Observable, map, tap } from 'rxjs';
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

  getFromCart(userId: string): Observable<Object> {
    return this.http.get(`https://store-payment-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/cart.json`).pipe(
      map((item: any) => Array.from(Object.values(item))),
    );
  }
}
