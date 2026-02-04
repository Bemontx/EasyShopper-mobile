import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth'; 
import { IonicModule } from '@ionic/angular';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.page.html',
  imports: [IonicModule, FormsModule]
})
export class RegisterPage {

  name = '';
  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register() {
    this.authService.register({
      name: this.name,
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => {
        alert('Usuario creado');
        this.router.navigateByUrl('/login');
      },
      error: () => {
        alert('Error al registrar');
      }
    });
  }
}
