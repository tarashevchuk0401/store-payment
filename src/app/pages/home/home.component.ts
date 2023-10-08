import { ObserversModule } from '@angular/cdk/observers';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { Product } from 'src/app/models/Product.model';
import { CartService } from 'src/app/services/cart.service';
import { DataBaseService } from 'src/app/services/data-base.service';
import { UnsubscribingService } from 'src/app/services/unsubscribing.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends UnsubscribingService implements OnInit {

  products: Array<Product> = [];
  categoryFilter: string = 'all';
  userId: string | null = '';
  sortPriceOperator: string = 'startPriceLow';

  constructor(
    private cartService: CartService,
    private dataBaseService: DataBaseService,
    private router: Router,
    private matSnackBar: MatSnackBar,
  ) {
    super()
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('id')
    this.getAllProducts();
    this.cartService.sendQuantityInCart();
  }

  addToCart(product: Product): void {
    let quantity: number = 1;

    // Check is user is logged in 
    if (this.userId) {
      this.cartService.addToCart(product.id, product.name, quantity, product.price, product.imageUrl)
        .pipe(takeUntil(this.unsubscriber$))
        .subscribe(d => {
          this.matSnackBar.open('Item added to cart', 'Ok', { duration: 3000 });
          this.cartService.sendQuantityInCart();
        });
    } else {
      this.router.navigate(['authorization'])
    }
  }

  getAllProducts(): void {
    this.dataBaseService.getAllProduct$()
      .pipe(takeUntil(this.unsubscriber$))
      .subscribe((_products) => {
        this.products = _products;
        this.sortByPrice();
      })
  }

  sortByPrice() {
    switch (this.sortPriceOperator) {
      case ('startPriceLow'):
        this.products.sort((a, b) => a.price - b.price);
        break;
      case ('startPriceHigh'):
        this.products.sort((a, b) => b.price - a.price);
        break;
    }
  }

  filterByCategory(category: string) {
    if (category === 'all') {
      this.getAllProducts();
    } else {
      this.dataBaseService.getAllProduct$()
        .pipe(takeUntil(this.unsubscriber$))
        .subscribe((_products) => {
          this.products = _products.filter(item => item.category == category);
          this.sortByPrice();
        })
    }
  }

  goToItemPage(id: string): void {
    this.router.navigate(['item-page/' + id])
  }

}
