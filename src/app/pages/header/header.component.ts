import { Component, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { map } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  itemsInCart: number| undefined  ;
  userId: string | null = localStorage.getItem('id');


  constructor(private cartService: CartService){}

  ngOnInit(): void {
   this.cartService.itemsInCart.subscribe(d => this.itemsInCart = d)
  }
  
}
