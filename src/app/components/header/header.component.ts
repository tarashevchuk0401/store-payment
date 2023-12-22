import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, debounceTime, map, takeUntil } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { isAdminGuard } from 'src/app/is-admin.guard';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy{

  itemsInCart: number | undefined;
  userId: string | null = '';
  isAdmin: any = false;
  unsubscribing$ = new Subject();

  constructor(private cartService: CartService, private matSnackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('id')
    this.cartService.itemsInCart.pipe(takeUntil(this.unsubscribing$)).subscribe(d => this.itemsInCart = d);

    this.isAdmin = isAdminGuard()
  }

  ngOnDestroy(): void {
    this.unsubscribing$.next(null);
    this.unsubscribing$.complete()
  }

  logOut() {
    this.matSnackBar.open('Logout', 'Ok', { duration: 3000 })
    
    localStorage.removeItem('id');
    setTimeout(() => {
      window.location.reload();
    }, 800)
  }

}
