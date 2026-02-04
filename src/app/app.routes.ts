import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then(m => m.LoginPage)
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.page').then(m => m.RegisterPage)
  },

  {
    path: 'products',
    loadComponent: () =>
      import('./pages/products/products.page').then(m => m.ProductsPage)
  },

  {
    path: 'cart',
    loadComponent: () =>
      import('./pages/cart/cart.page').then(m => m.CartPage)
  },

  {
    path: 'checkout',
    loadComponent: () =>
      import('./pages/checkout/checkout.page').then(m => m.CheckoutPage)
  }
];
