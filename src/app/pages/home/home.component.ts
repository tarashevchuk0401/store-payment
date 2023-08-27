import { Component } from '@angular/core';
import { Product } from 'src/app/models/Product.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  products: Array<Product> = [
    {
      id: '1234',
      name: 'Bike',
      description: 'Mtb sdf sdf sdfsdfsdf sdfsdf ',
      price: 12,
      imageUrl: 'https://sportano.pl/img/5c06e5cc417e494d49cecc1c7a999f9a/8/4/8434446745119_20E-jpg/rower-gorski-orbea-mx-29-50-czerwony-564610.jpg',
    },
    {
      id: '1235',
      name: 'SUPER BIKE',
      description: 'bike bikebikebikebikebike  bike bikev v bike bike ',
      price: 1200,
      imageUrl: 'https://sportano.pl/img/5c06e5cc417e494d49cecc1c7a999f9a/8/4/8434446745119_20E-jpg/rower-gorski-orbea-mx-29-50-czerwony-564610.jpg',
    },
    {
      id: '1214',
      name: 'Real Bike ',
      description: 'Mtb sdf sdf sdfsdfasd asd asdasd asdasd asdadsfa sdasd sdf sdfsdf ',
      price: 1,
      imageUrl: 'https://sportano.pl/img/5c06e5cc417e494d49cecc1c7a999f9a/8/4/8434446745119_20E-jpg/rower-gorski-orbea-mx-29-50-czerwony-564610.jpg',
    },
  ]

  constructor(private cartService: CartService) { }

  addToCart(product: Product): void {
    let quantity : number = 1; 
    this.cartService.addToCart(product.id, product.name, quantity, product.price, product.imageUrl ).subscribe()
  }

}
