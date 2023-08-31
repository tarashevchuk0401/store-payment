import { ObserversModule } from '@angular/cdk/observers';
import { Component, OnInit } from '@angular/core';
import { Observer } from 'rxjs';
import { Product } from 'src/app/models/Product.model';
import { CartService } from 'src/app/services/cart.service';
import { DataBaseService } from 'src/app/services/data-base.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  products: Array<Product> = []

  constructor(private cartService: CartService, private dataBaseService: DataBaseService) { }

  ngOnInit(): void {
    this.getAllProducts()
  }

  addToCart(product: Product): void {
    let quantity : number = 1; 
    this.cartService.addToCart(product.id, product.name, quantity, product.price, product.imageUrl ).subscribe()
  }

  getAllProducts():void{
     this.dataBaseService.getAllProduct$().subscribe((_products) => this.products = _products)
  }

}
