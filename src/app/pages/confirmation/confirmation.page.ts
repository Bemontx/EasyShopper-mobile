import { Component } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './confirmation.page.html'
})
export class ConfirmationPage {

  constructor(private navCtrl: NavController) {} 

  goHome() {
    
    const userId = localStorage.getItem('userId');
    this.navCtrl.navigateRoot('/tabs/products', {
      animated: true,
      animationDirection: 'back' 
    });
  }
}