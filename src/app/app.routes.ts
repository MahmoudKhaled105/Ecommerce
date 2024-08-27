import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductComponent } from './components/product/product.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { authGuard } from '../guard/auth.guard';
import { DetailsproductComponent } from './components/detailsproduct/detailsproduct.component';
import { PaymentComponent } from './components/payment/payment.component';
import { AllordersComponent } from './components/allorders/allorders.component';

export const routes: Routes = [
  {
    path: '',
    component: BlankLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', canActivate: [authGuard], component: HomeComponent },
      { path: 'cart', canActivate: [authGuard], component: CartComponent },
      {
        path: 'payment/:id',
        canActivate: [authGuard],
        component: PaymentComponent,
      },
      {
        path: 'product',
        canActivate: [authGuard],
        component: ProductComponent,
      },
      {
        path: 'allorders',
        canActivate: [authGuard],
        component: AllordersComponent,
      },
      {
        path: 'details/:id',
        canActivate: [authGuard],
        component: DetailsproductComponent,
      },
      {
        path: 'categories',
        canActivate: [authGuard],
        component: CategoriesComponent,
      },
      { path: 'brands', canActivate: [authGuard], component: BrandsComponent },
    ],
  },

  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },

  { path: '**', component: NotfoundComponent },
];
