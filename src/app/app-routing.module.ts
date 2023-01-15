import { MyOrdersComponent } from './my-orders/my-orders.component';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './services/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { appCheckInstance$ } from '@angular/fire/app-check';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'admin/product', component: AdminProductComponent, canActivate: [AuthGuard] },
  { path: 'admin/product/form', component: ProductFormComponent, canActivate: [AuthGuard] },
  { path: 'admin/product/:id', component: ProductFormComponent, canActivate: [AuthGuard] },
  { path: 'shoppingCart', component: ShoppingCartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: "signUp", component: SignupComponent },
  { path: "shippingForm", component: ShippingFormComponent },
  { path: "myOrders", component: MyOrdersComponent, canActivate:[AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
