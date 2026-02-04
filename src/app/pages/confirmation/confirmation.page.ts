import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './confirmation.page.html'
})
export class ConfirmationPage {

  constructor(private router: Router) {}

  goHome() {
    this.router.navigateByUrl('/products');
  }
}
