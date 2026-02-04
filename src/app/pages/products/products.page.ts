import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { ProductsService } from '../../services/products.service';
import { Product } from 'src/app/models/models';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './products.page.html'
})
export class ProductsPage implements OnInit {

  products: Product[] = [];

  constructor(
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productsService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: () => {
        alert('Error cargando productos');
      }
    });
  }

  addToCart(product: Product) {
    console.log('Producto agregado:', product);
  }

}
