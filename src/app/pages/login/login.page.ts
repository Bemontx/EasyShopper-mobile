import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth'; 
import { IonicModule } from '@ionic/angular';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.page.html',
  imports: [IonicModule, FormsModule]
})
export class LoginPage {

  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    this.authService.login({
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => {
        this.router.navigateByUrl('/products');
      },
      error: () => {
        alert('Credenciales incorrectas');
      }
    });
  }
}
