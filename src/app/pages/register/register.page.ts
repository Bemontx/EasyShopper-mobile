import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth'; 
import { IonicModule,LoadingController, ToastController } from '@ionic/angular';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  imports: [IonicModule, FormsModule]
})
export class RegisterPage {

  name = '';
  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  async register() {
    if (!this.name || !this.email || !this.password) {
      this.showToast('Por favor, rellena todos los campos');
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Creando cuenta...',
      spinner: 'crescent'
    });
    await loading.present();

    this.authService.register({
      name: this.name,
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res) => {
        loading.dismiss();
        this.showToast('¡Registro exitoso! Ya puedes iniciar sesión', 'success');
        this.router.navigateByUrl('/login');
      },
      error: (err) => {
        loading.dismiss();
        const msg = err.error || 'Error en el servidor';
        this.showToast(msg, 'danger');
        console.error('Error de registro:', err);
      }
    });
  }

  async showToast(message: string, color: string = 'dark') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color,
      position: 'bottom'
    });
    await toast.present();
  }
}
