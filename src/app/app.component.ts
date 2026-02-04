import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IonicModule],
  template: `<ion-app>
               <ion-router-outlet></ion-router-outlet>
             </ion-app>`
})
export class AppComponent {}
