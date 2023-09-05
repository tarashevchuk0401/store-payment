import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { Product } from 'src/app/models/Product.model';
import { CartService } from 'src/app/services/cart.service';
import { DataBaseService } from 'src/app/services/data-base.service';
import { UnsubscribingService } from 'src/app/services/unsubscribing.service';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.scss']
})

export class ItemPageComponent extends UnsubscribingService implements OnInit {

  product: Product | undefined;
  currentId: string = this.activatedRoute.snapshot.params['id'];
  userId: string | null = localStorage.getItem('id');

  constructor(
    private dataBaseService: DataBaseService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private matSnackBar: MatSnackBar,
    private router: Router
  ) { 
    super()
  }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
    this.dataBaseService.getProductById$(this.currentId).pipe(takeUntil(this.unsubscriber$)).subscribe((data: Product) => this.product = data)
  }


  addToCart(): void {
    let quantity: number = 1;

    // Check is user is logged in 
    if (this.userId && this.product) {
      this.cartService.addToCart(this.product.id, this.product.name, quantity, this.product.price, this.product.imageUrl)
      .pipe(takeUntil(this.unsubscriber$))
      .subscribe(() => {
        this.matSnackBar.open('Item added to cart', 'Ok', { duration: 3000 });
        this.cartService.sendQuantityInCart();
      });
    } else {
      this.router.navigate(['authorization'])
    }
  }
}
