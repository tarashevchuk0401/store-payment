import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartItem } from '../models/CartItem.model';
import { BehaviorSubject, Observable, Subject, map, tap } from 'rxjs';
import { Cart } from '../models/Cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  userId = localStorage.getItem('id');
  itemsInCart = new Subject<number>();

  constructor(private http: HttpClient) { }

  addToCart(newProductId: string, newProductName: string, newQuantity: number, newProductPrice: number, newImageUrl: string): Observable<CartItem> {
    return this.http.put<CartItem>(`https://store-payment-default-rtdb.europe-west1.firebasedatabase.app/users/${this.userId}/cart/${newProductId}.json`, {
      productId: newProductId,
      productName: newProductName,
      quantity: newQuantity,
      price: newProductPrice,
      imageUrl: newImageUrl,
    })
  }

  getFromCart$(userId: string): Observable<CartItem[]> {
    return this.http.get(`https://store-payment-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/cart.json`).pipe(
      map((item: any) => Array.from(Object.values(item))),
    );
  }

  // Getting from data base quantity of items in cart and send it to the different components in application
  sendQuantityInCart() {
    if (this.userId) {
      this.getFromCart$(this.userId).subscribe((d: any) => {
        this.itemsInCart.next(d.length);
      })
    }
  }

  changeQuantity(id: string, quantity: number):Observable<any>{
    return this.http.patch((`https://store-payment-default-rtdb.europe-west1.firebasedatabase.app/users/${this.userId}/cart/${id}.json`) , {quantity: quantity})
  }

  removeFromCart(id:string): Observable<any>{
    return this.http.delete(`https://store-payment-default-rtdb.europe-west1.firebasedatabase.app/users/${this.userId}/cart/${id}.json`)
  }
}
