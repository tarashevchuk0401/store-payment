import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/models/Product.model';
import { DataBaseService } from 'src/app/services/data-base.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  /// Image variables 
  path: string = '';
  name: string = '';
  urlOfImage: string = '';

  constructor(private dataBaseService: DataBaseService, private fireStorage: AngularFireStorage ) { }

  // Adding new product to DB, creating id for product, reset of  newProductForm in HTML
  addNewProduct(newProductForm: NgForm): void {
    let newId: string = Math.floor((Math.random() * 1000000000) + 1).toString();

    let product: Product = {
      id: newId,
      name: newProductForm.value.name,
      category: newProductForm.value.category,
      description: newProductForm.value.description,
      price: newProductForm.value.price,
      imageUrl: 'https://www.sklepbiker.pl/wp-content/uploads/2022/06/M_Bike_GRV_400.jpg'
    }
    this.dataBaseService.addNewProduct(product.id, product.name, product.category, product.description, product.price, product.imageUrl)
      .subscribe(data => newProductForm.reset());

      this.uploadImage(newId)
  } 

  upload($event: any) {
    this.path = $event.target.files[0]
  }
  
  
  async uploadImage(newId: string) {
    console.log(this.path);
    const uploadTask = await this.fireStorage.upload(newId, this.path);
    const url = await uploadTask.ref.getDownloadURL();
    this.urlOfImage = await url;
    console.log(url)
    // await this.server.addUrlOfImage(myId, this.urlOfImage).subscribe(d => window.location.reload())
  }

 

}
