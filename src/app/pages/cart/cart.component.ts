import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { loadStripe } from '@stripe/stripe-js';
import { map } from 'rxjs';
import { Cart } from 'src/app/models/Cart.model';
import { CartItem } from 'src/app/models/CartItem.model';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  cart: Cart = {
    userId: '',
    items: []
  };

  constructor(private cartService: CartService, private http: HttpClient) { }

  ngOnInit(): void {
    this.getCart();
  }

  ngOnDestroy(): void {
  }

  getCart() {
    let userId = localStorage.getItem('id');

    if (userId) {
      this.cartService.getFromCart(userId).subscribe((data: any) => {
        this.cart.userId = localStorage.getItem('id')!;

        this.cart.items = data;
        console.log(this.cart.items);
      })
    }
  }

  checkout(){
    this.http.post('http://localhost:4243/checkout', {
      items: this.cart.items
    }).subscribe(async(res: any) => {
      console.log(res)
      let stripe = await loadStripe('pk_test_51NjOrHHGPo1tmSJDVkQWhvbMfdwy83hx3f4cBuARFFG2eu5M1In4pmdfQiboSjFtWClwN6Vo4U33lad0tCMZS0u800xUMw1gI3');
      stripe?.redirectToCheckout({
        sessionId: res.id
      })
    })
  }
}
