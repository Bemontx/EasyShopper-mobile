import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { Product } from '../models/models'; 

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private items: CartItem[] = [];

  getItems(): CartItem[] {
    return this.items;
  }

  addToCart(product: Product) {

    const item = this.items.find(
      i => i.product.id === product.id
    );

    if (item) {
      item.quantity++;
    } else {
      this.items.push({
        product,
        quantity: 1
      });
    }
  }

  removeItem(productId: string) {
    this.items = this.items.filter(
      i => i.product.id !== productId
    );
  }

  clear() {
    this.items = [];
  }

  getTotal(): number {
    return this.items.reduce(
      (sum, item) =>
        sum + item.product.price * item.quantity,
      0
    );
  }
}
