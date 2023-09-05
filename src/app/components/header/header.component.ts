import { Component, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime, map, takeUntil } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { isAdminGuard } from 'src/app/is-admin.guard';
import { UnsubscribingService } from 'src/app/services/unsubscribing.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends UnsubscribingService implements OnInit {

  itemsInCart: number | undefined;
  userId: string | null = '';
  isAdmin: any = false;


  constructor(private cartService: CartService, private matSnackBar: MatSnackBar) {
    super()
   }

  ngOnInit(): void {
    this.userId = localStorage.getItem('id')
    this.cartService.itemsInCart.pipe(takeUntil(this.unsubscriber$)).subscribe(d => this.itemsInCart = d);

    this.isAdmin = isAdminGuard()
  }

  logOut() {
    this.matSnackBar.open('Loged out', 'Ok', { duration: 3000 })
    localStorage.removeItem('id');
    setTimeout(() => {
      window.location.reload();
    }, 800)
  }

}
