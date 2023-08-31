import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/Product.model';
import { Observable, map } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  //Adding new product by product.id, open snackBar;
  addNewProduct(
    productId: string, productName: string, productCategory:string, productDescription: string,
    productPrice: number, productImageUrl: string
  ): Observable<Product> {
    this.snackBar.open('New prduct added to the data base', 'Ok', {duration: 2000})

    return this.http.put<Product>(`https://store-payment-default-rtdb.europe-west1.firebasedatabase.app/products/${productId}.json`, {
      id: productId,
      name: productName,
      category: productCategory,
      descriptions: productDescription,
      price: productPrice,
      imageUrl: productImageUrl,
    })
  }

  getAllProduct$(): Observable<Array<Product>>{
    return this.http.get<Array<Product>>('https://store-payment-default-rtdb.europe-west1.firebasedatabase.app/products.json')
    .pipe(map(item => Object.values(item)))
  }
}
