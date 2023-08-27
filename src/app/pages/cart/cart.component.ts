import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Cart } from 'src/app/models/Cart.model';
import { CartItem } from 'src/app/models/CartItem.model';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  
  cart: Cart = {
    userId: '',
    items : []
  }

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
    this.cartService.getFromCart().pipe(
      map((item: any) => {
        this.cart.items = Object.values(item)
      })
    ).subscribe((data: any) => {
      this.cart.userId = localStorage.getItem('id')!;
      console.log(this.cart)
    })
  }
}
