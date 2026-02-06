# 📱 EasyShopper - Frontend

Aplicación móvil híbrida de e-commerce desarrollada con **Ionic Framework** y **Angular**.

## 🎯 Descripción

Frontend de la aplicación EasyShopper que permite a los usuarios navegar un catálogo de productos, agregar artículos al carrito y realizar compras simuladas. Desarrollada con arquitectura modular utilizando Standalone Components de Angular.

## 🛠️ Tecnologías

- **Ionic Framework 7+**
- **Angular 16+**
- **TypeScript**
- **RxJS**
- **Ionic Components**

## 📁 Estructura del Proyecto
```
src/
├── app/
│   ├── pages/
│   │   ├── login/
│   │   ├── register/
│   │   ├── products/
│   │   ├── cart/
│   │   ├── checkout/
│   │   └── confirmation/
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── product.service.ts
│   │   ├── cart.service.ts
│   │   └── order.service.ts
│   ├── models/
│   │   ├── product.model.ts
│   │   ├── cart-item.model.ts
│   │   ├── order.model.ts
│   │   └── user.model.ts
│   └── app.routes.ts
├── environments/
│   ├── environment.ts
│   └── environment.prod.ts
└── assets/
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js 16+
- npm o yarn
- Ionic CLI
```bash
npm install -g @ionic/cli
```

### Pasos de instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd easyshopper-frontend
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**

Editar `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'https://localhost:7001/api'
};
```

4. **Ejecutar en desarrollo**
```bash
ionic serve
```

La aplicación estará disponible en `http://localhost:8100`

## 📱 Páginas y Funcionalidades

### 🔐 Login (`/login`)
- Inicio de sesión con email y contraseña
- Almacenamiento de JWT en localStorage
- Redirección automática a catálogo tras autenticación exitosa
- Validación de formularios

**Componentes utilizados:**
- `ion-input`
- `ion-button`
- `ion-card`

### ✍️ Register (`/register`)
- Registro de nuevos usuarios
- Validación de campos requeridos
- Creación de cuenta y login automático
- Mensajes de error personalizados

### 🛍️ Products (`/products`)
- Catálogo completo de productos
- Visualización con imagen, nombre y precio
- Botón "Agregar al carrito"
- Diseño responsivo con cards

**Funcionalidades:**
```typescript
// Agregar producto al carrito
addToCart(product: Product) {
  this.cartService.addToCart(product);
  // Mostrar toast de confirmación
}
```

### 🛒 Cart (`/cart`)
- Lista de productos agregados
- Visualización de cantidad por producto
- Cálculo automático del total
- Botón "Finalizar compra"
- Opción para vaciar carrito

**Guard de autenticación:**
- Redirección a `/login` si el usuario no está autenticado

### 💳 Checkout (`/checkout`)
- Confirmación de datos del pedido
- Envío de orden al backend
- Validación de items en carrito
- Manejo de errores de conexión

**Flujo:**
```typescript
async processOrder() {
  const order = {
    items: this.cartService.getItems(),
    total: this.cartService.getTotal(),
    userId: this.authService.getCurrentUserId()
  };
  
  const result = await this.orderService.createOrder(order);
  
  if (result.success) {
    this.router.navigate(['/confirmation']);
  }
}
```

### ✅ Confirmation (`/confirmation`)
- Mensaje de compra exitosa
- Limpieza del carrito
- Opción para volver al catálogo
- Visualización del número de orden

## 🔧 Servicios

### AuthService
Gestión de autenticación y sesión de usuario.
```typescript
class AuthService {
  login(email: string, password: string): Observable<AuthResult>
  register(userData: RegisterDto): Observable<AuthResult>
  logout(): void
  isLoggedIn(): boolean
  getToken(): string | null
  saveToken(token: string): void
}
```

### ProductService
Consumo de API de productos.
```typescript
class ProductService {
  getProducts(): Observable<Product[]>
  getProductById(id: string): Observable<Product>
}
```

**Endpoint consumido:**
```
GET /api/products
```

### CartService
Gestión del estado del carrito (en memoria).
```typescript
class CartService {
  private items: CartItem[] = []
  
  addToCart(product: Product, quantity?: number): void
  removeFromCart(productId: string): void
  getItems(): CartItem[]
  getTotal(): number
  getItemCount(): number
  clear(): void
}
```

### OrderService
Creación de órdenes de compra.
```typescript
class OrderService {
  createOrder(order: CreateOrderDto): Observable<OrderResult>
}
```

**Endpoint consumido:**
```
POST /api/orders
```

## 🗺️ Rutas de la Aplicación
```typescript
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPage },
  { path: 'register', component: RegisterPage },
  { path: 'products', component: ProductsPage },
  { 
    path: 'cart', 
    component: CartPage,
    canActivate: [AuthGuard]
  },
  { 
    path: 'checkout', 
    component: CheckoutPage,
    canActivate: [AuthGuard]
  },
  { path: 'confirmation', component: ConfirmationPage }
];
```

## 🎨 Componentes de UI

La aplicación utiliza componentes nativos de Ionic:

- `ion-header` / `ion-toolbar`
- `ion-content`
- `ion-card` / `ion-card-header` / `ion-card-content`
- `ion-list` / `ion-item`
- `ion-input`
- `ion-button`
- `ion-icon`
- `ion-toast`
- `ion-loading`

## 🔄 Flujo de Usuario
```
1. Login/Register
   ↓
2. Products (Catálogo)
   ↓
3. Add to Cart (Agregar productos)
   ↓
4. Cart (Revisar carrito)
   ↓
5. Checkout (Confirmar compra)
   ↓
6. Confirmation (Compra exitosa)
```

## 🔐 Autenticación

- **JWT Storage:** Los tokens se almacenan en `localStorage`
- **Auth Guard:** Protege rutas que requieren autenticación
- **Interceptor:** Adjunta token JWT a peticiones HTTP automáticamente
```typescript
// HTTP Interceptor
intercept(req: HttpRequest<any>, next: HttpHandler) {
  const token = this.authService.getToken();
  
  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }
  
  return next.handle(req);
}
```

## 📦 Compilación para Producción

### Web
```bash
ionic build --prod
```

### Android APK
```bash
ionic capacitor add android
ionic capacitor build android
```

### iOS
```bash
ionic capacitor add ios
ionic capacitor build ios
```

## 🧪 Testing
```bash
# Unit tests
npm run test

# E2E tests
npm run e2e
```

## 🌐 Variables de Entorno

### Development
```typescript
export const environment = {
  production: false,
  apiUrl: 'https://localhost:7001/api',
  enableDebug: true
};
```

### Production
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.easyshopper.com/api',
  enableDebug: false
};
```

## 🎯 Características Implementadas

- ✅ Registro e inicio de sesión
- ✅ Catálogo de productos con imágenes
- ✅ Carrito de compras funcional
- ✅ Proceso de checkout
- ✅ Confirmación de pedidos
- ✅ Guards de autenticación
- ✅ Diseño responsive
- ✅ Manejo de errores
- ✅ Loading states
- ✅ Toast notifications

## 🚀 Mejoras Futuras

- [ ] Persistencia del carrito en localStorage
- [ ] Historial de órdenes
- [ ] Búsqueda y filtros de productos
- [ ] Categorías de productos
- [ ] Perfil de usuario editable
- [ ] Wishlist / Favoritos
- [ ] Notificaciones push
- [ ] Modo oscuro
- [ ] Internacionalización (i18n)
- [ ] Animaciones avanzadas
- [ ] Offline mode con Capacitor

## 🐛 Solución de Problemas

### Error de CORS
Asegúrate de que el backend tenga configurado CORS para el origen del frontend:
```csharp
builder.Services.AddCors(options => {
    options.AddPolicy("AllowIonic", policy => {
        policy.WithOrigins("http://localhost:8100")
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});
```

### Token no se envía
Verifica que el interceptor HTTP esté registrado en `app.config.ts`:
```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
};
```

## 📄 Licencia

Este proyecto fue desarrollado como parte de una prueba técnica.

## 👥 Autor

Desarrollado para la prueba técnica de EasyShopper

---

**Nota:** Este frontend consume la API REST desarrollada en ASP.NET Core. Asegúrate de tener el backend ejecutándose antes de iniciar la aplicación.
