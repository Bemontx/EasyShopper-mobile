import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { CartService } from '../../services/cart.service';
import { OrdersService } from 'src/app/services/orders';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './checkout.page.html'
})
export class CheckoutPage implements OnInit {

  total = 0;

  constructor(
    private cartService: CartService,
    private ordersService: OrdersService,
    private router: Router
  ) {}

  ngOnInit() {
    this.total = this.cartService.getTotal();
  }

  confirmPurchase() {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

  if (!userId) {
    alert('Sesión expirada. Por favor, inicia sesión de nuevo.');
    this.router.navigateByUrl('/login');
    return;
  }

  const order = { userId: userId, totalAmount: this.total };

  this.ordersService.createOrder(order).subscribe({
    next: () => {
      this.cartService.clear();
      
      (document.activeElement as HTMLElement)?.blur();
      this.router.navigateByUrl('/confirmation');
    },
    error: (err) => {
      alert('No se pudo procesar la compra. Intenta de nuevo.');
    }
  });
  }
}
