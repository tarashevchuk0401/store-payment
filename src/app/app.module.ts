import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './pages/auth/auth.component';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { MaterialsModule } from './materials/materials.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { CartService } from './services/cart.service';
import { DataBaseService } from './services/data-base.service';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { ItemPageComponent } from './pages/item-page/item-page.component';
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    CartComponent,
    HeaderComponent,
    FooterComponent,
    ItemPageComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialsModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService, CartService,DataBaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
