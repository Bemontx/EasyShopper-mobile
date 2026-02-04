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

    const order = {
      totalAmount: this.total
    };

    this.ordersService.createOrder(order)
      .subscribe(() => {
        this.cartService.clear();
        this.router.navigateByUrl('/confirmation');
      });

  }
}
