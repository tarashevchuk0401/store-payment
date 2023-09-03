import { ObserversModule } from '@angular/cdk/observers';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observer, filter } from 'rxjs';
import { Product } from 'src/app/models/Product.model';
import { CartService } from 'src/app/services/cart.service';
import { DataBaseService } from 'src/app/services/data-base.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Array<Product> = [];
  categoryFilter: string = 'all';
  userId: string | null = '' ;

  constructor(
    private cartService: CartService,
    private dataBaseService: DataBaseService,
    private router: Router,
    private matSnackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
   this.userId = localStorage.getItem('id')
    this.getAllProducts();
    this.cartService.sendQuantityInCart()
  }

  addToCart(product: Product): void {
    let quantity: number = 1;

    // Check is user is logged in 
    if (this.userId) {
      this.cartService.addToCart(product.id, product.name, quantity, product.price, product.imageUrl).subscribe(d => {
        this.matSnackBar.open('Item added to cart', 'Ok', { duration: 3000 });
        this.cartService.sendQuantityInCart();
      });
    } else {
      this.router.navigate(['auth'])
    }
  }

  getAllProducts(): void {
    this.dataBaseService.getAllProduct$().subscribe((_products) => this.products = _products)
  }

  sortProducts(operator: string) {
    switch (operator) {
      case ('priceLow'):
        this.products.sort((a, b) => a.price - b.price);
        break;
      case ('priceHigh'):
        this.products.sort((a, b) => b.price - a.price);
        break;

    }
  }

  filterByCategory(category: string) {
    if (category === 'all') {
      this.getAllProducts();
    } else {
      this.dataBaseService.getAllProduct$().subscribe((_products) => {
        this.products = _products.filter(item => item.category == category)
      })
    }
  }

  goToItemPage(id: string): void{
    this.router.navigate(['item-page/'+id])
  }

}
