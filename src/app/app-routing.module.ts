import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { ItemPageComponent } from './pages/item-page/item-page.component';
import { AuthorizationComponent } from './pages/authorization/authorization.component';
import { isAdminGuard } from './is-admin.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'authorization', component: AuthorizationComponent },
  { path: 'cart', component: CartComponent },
  { path: 'item-page/:id', component: ItemPageComponent },
  {
    path: 'admin',
    canActivate: [isAdminGuard],
    loadChildren: () =>
      import('./lazy-load/lazy-load.module').then(
        (m) => m.LazyLoadModule
      ),
  },
  { path: '**', component: HomeComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
