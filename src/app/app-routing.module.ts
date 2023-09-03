import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthComponent } from './components/auth/auth.component';
import { CartComponent } from './pages/cart/cart.component';
import { ItemPageComponent } from './pages/item-page/item-page.component';
import { AuthorizationComponent } from './pages/authorization/authorization.component';

const routes: Routes = [
  {path: '', component : HomeComponent},
  {path: 'home', component : HomeComponent},
  {path: 'authorization', component : AuthorizationComponent},
  {path: 'cart', component : CartComponent},
  {path: 'item-page/:id', component : ItemPageComponent},
  {
    path: 'admin',
    loadChildren: () =>
      import('./lazy-load/lazy-load.module').then(
        (m) => m.LazyLoadModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
