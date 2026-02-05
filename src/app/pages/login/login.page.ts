import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router,RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth'; 
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';


@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.page.html',
  imports: [IonicModule, FormsModule, CommonModule,RouterModule]
})
export class LoginPage {

  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {this.authService.login({
    email: this.email,
    password: this.password
  }).subscribe({
    next: (res: any) => {
      const userId = res.id || res.Id; 
      
      if (userId) {
        localStorage.setItem('userId', userId); 
        localStorage.setItem('token', res.token || res.Token);
        this.router.navigateByUrl('/tabs/products');
      } else {
        console.error('El backend no envió el ID del usuario', res);
      }
    },
    error: (err) => {
      alert('Credenciales incorrectas');
    }
    });
  }
}
