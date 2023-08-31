import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/models/Product.model';
import { DataBaseService } from 'src/app/services/data-base.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  constructor(private dataBaseService : DataBaseService){}

  addNewProduct(newProductForm: NgForm): void{
    let newId : string = Math.floor((Math.random()*1000000000)+1).toString();

    let product : Product = {
      id: newId,
      name: newProductForm.value.name,
      category: newProductForm.value.category,
      description : newProductForm.value.description,
      price : newProductForm.value.price,
      imageUrl : 'https://www.sklepbiker.pl/wp-content/uploads/2022/06/M_Bike_GRV_400.jpg'
    }
   this.dataBaseService.addNewProduct(product.id, product.name, product.category, product.description, product.price, product.imageUrl)
   .subscribe(data => newProductForm.reset());
  }

}
