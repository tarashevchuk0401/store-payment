import { Component, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime, map } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  itemsInCart: number | undefined;
  userId: string | null = '';


  constructor(private cartService: CartService, private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('id')
    this.cartService.itemsInCart.subscribe(d => this.itemsInCart = d);
  }

  logOut() {
    this.matSnackBar.open('Loged out', 'Ok', { duration: 3000 })
    localStorage.removeItem('id');
    setTimeout(() => {
      window.location.reload();
    }, 800)
  }

}
