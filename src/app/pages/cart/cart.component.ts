import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { Subscription, catchError, debounceTime, map, takeUntil } from 'rxjs';
import { Cart } from 'src/app/models/Cart.model';
import { CartItem } from 'src/app/models/CartItem.model';
import { CartService } from 'src/app/services/cart.service';
import { UnsubscribingService } from 'src/app/services/unsubscribing.service';


const STRIPE_PUBLIC_KEY = 'pk_test_51NjOrHHGPo1tmSJDVkQWhvbMfdwy83hx3f4cBuARFFG2eu5M1In4pmdfQiboSjFtWClwN6Vo4U33lad0tCMZS0u800xUMw1gI3';
const CHECKOUT_SERVER_URL = 'http://localhost:4243/checkout';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent extends UnsubscribingService implements OnInit, OnDestroy {
  cart: Cart = {
    userId: '',
    items: []
  };

  totalPrice: number = 0;

  constructor(private cartService: CartService, private http: HttpClient) { 
    super()
  }

  ngOnInit(): void {
    this.getCart();
  }

  getCart(): void {
    let userId = localStorage.getItem('id');

    if (userId) {
      this.cartService.getFromCart$(userId)
      .pipe(takeUntil(this.unsubscriber$))
      .subscribe((data: any) => {
        this.cart.items = data;
        // Send quantity of items in cart 
        this.cartService.sendQuantityInCart();
        this.getTotalPrice();
      })
    }
  }



  // Go to checkout (payment). Need to run server on localhost 4243 (server.js)
  // checkout(): void {
  //   console.log(this.cart.items)
  //   this.http.post('http://localhost:4243/checkout', {
  //     items: this.cart.items
  //   }).subscribe(async (res: any) => {
  //     console.log(res)
  //     let stripe = await loadStripe('pk_test_51NjOrHHGPo1tmSJDVkQWhvbMfdwy83hx3f4cBuARFFG2eu5M1In4pmdfQiboSjFtWClwN6Vo4U33lad0tCMZS0u800xUMw1gI3');
  //     stripe?.redirectToCheckout({
  //       sessionId: res.id
  //     })
  //   })
  // }
  checkout(): void {
    console.log(this.cart.items);
    this.http.post(CHECKOUT_SERVER_URL, { items: this.cart.items })
      .pipe(
        catchError(error => {
          console.error('Error during checkout:', error);
          return [];
        })
      )
      .subscribe(async (res: any) => {
        console.log(res);
        const stripe = await loadStripe(STRIPE_PUBLIC_KEY);
        stripe?.redirectToCheckout({
          sessionId: res.id
        });
      });
  }

  changeQuantity(id: string, quantity: number, operator: string): Subscription | void {
    if (quantity === 1 && operator === '-') {
      return this.cartService.removeFromCart(id)
      .pipe(takeUntil(this.unsubscriber$))
      .subscribe(d => {
        this.cart.items = this.cart.items.filter((item: CartItem) => item.productId !== id);
        // Send quantity of items in cart 
        this.cartService.sendQuantityInCart();
        this.getTotalPrice();
      })
    }

    if (operator === '+') {
      let newQuantity = quantity + 1;
      this.cartService.changeQuantity(id, newQuantity).pipe(takeUntil(this.unsubscriber$)).subscribe(() => this.getCart())
    } if (operator === '-') {
      let newQuantity = quantity - 1;
      this.cartService.changeQuantity(id, newQuantity).pipe(takeUntil(this.unsubscriber$)).subscribe(() => this.getCart())
    }
    this.getTotalPrice();
  }

  removeFromCart(id: string, quantity: number): void {
    if (this.cart.items.length === 1 && quantity === 1) {
      this.cart.items = this.cart.items.filter((item: CartItem) => item.productId !== id);
    }
    this.cartService.removeFromCart(id).pipe(takeUntil(this.unsubscriber$)).subscribe(() => {
      this.getCart();
      // Send quantity of items in cart 
      this.cartService.sendQuantityInCart();
    })
  }

  getTotalPrice(): void {
    let amountOfEachItem = this.cart.items.map(item => item.price * item.quantity);
    this.totalPrice = amountOfEachItem.reduce((accum, curr) => {
      return accum += curr
    }, 0)
  }

}
