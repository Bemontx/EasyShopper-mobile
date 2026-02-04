import { Routes } from '@angular/router';

export const routes: Routes = [

  // ======================
  // AUTH
  // ======================

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page')
        .then(m => m.LoginPage)
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.page')
        .then(m => m.RegisterPage)
  },

  // ======================
  // TABS LAYOUT
  // ======================

  {
    path: 'tabs',
    loadComponent: () =>
      import('./pages/tabs/tabs.page')
        .then(m => m.TabsPage),
    children: [

      {
        path: 'products',
        loadComponent: () =>
          import('./pages/products/products.page')
            .then(m => m.ProductsPage)
      },

      {
        path: 'cart',
        loadComponent: () =>
          import('./pages/cart/cart.page')
            .then(m => m.CartPage)
      },

      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full'
      }

    ]
  },

  // ======================
  // FLUJO DE COMPRA
  // ======================

  {
    path: 'checkout',
    loadComponent: () =>
      import('./pages/checkout/checkout.page')
        .then(m => m.CheckoutPage)
  },

  {
    path: 'confirmation',
    loadComponent: () =>
      import('./pages/confirmation/confirmation.page')
        .then(m => m.ConfirmationPage)
  },

  // ======================
  // FALLBACK
  // ======================

  {
    path: '**',
    redirectTo: 'login'
  }

];
