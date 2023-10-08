import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/models/Product.model';
import { DataBaseService } from 'src/app/services/data-base.service';
import { AngularFireStorage } from '@angular/fire/compat/storage'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent  implements OnInit, OnDestroy{
  products: Array<Product> = []
  unsubscribing$ = new Subject();
  imageFile: any;

  constructor(
    private dataBaseService: DataBaseService,
    private fireStorage: AngularFireStorage,
    private matSnckBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getAllProducts()
  }

  ngOnDestroy(): void {
      this.unsubscribing$.next(null);
      this.unsubscribing$.complete()
  }

  getAllProducts(): void {
    this.dataBaseService.getAllProduct$().pipe(takeUntil(this.unsubscribing$)).subscribe((data) => this.products = data)
  }

  deleteFromDB(id: string): void {
    this.dataBaseService.deleteFromBD(id).pipe(takeUntil(this.unsubscribing$)).subscribe(() => {
      this.matSnckBar.open('Product removed from data base', 'Ok', { duration: 3000 });
      this.getAllProducts();
    })
  }

  uploadImage(event: any): void {
    this.imageFile = event.target.files[0];
  }

  async addNewProduct(newProductForm: NgForm): Promise<void> {
    let newId: string = Math.floor((Math.random() * 1000000000) + 1).toString();
    let newImageUrl: string = '';

    if (this.imageFile) {
      let path = `${this.imageFile.name}`;
      const uploadTask = await this.fireStorage.upload(path, this.imageFile)
      const url = await uploadTask.ref.getDownloadURL();
      newImageUrl = url;
    }

    let product: Product = {
      id: newId,
      name: newProductForm.value.name,
      category: newProductForm.value.category,
      description: newProductForm.value.description,
      price: newProductForm.value.price,
      imageUrl: newImageUrl,
    }

    this.dataBaseService.addNewProduct(product.id, product.name, product.category, product.description, product.price, product.imageUrl)
      .pipe(takeUntil(this.unsubscribing$))
      .subscribe(() => {
        newProductForm.reset()
      });
    this.getAllProducts();
  }

}
