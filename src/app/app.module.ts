import { ToastsContainer } from './toasts-container.component';
import { UserService } from './services/user.service';
import { ProductService } from './services/product.service';
import { DataTableService } from './services/data-table.service';
import { CategoryService } from './services/category.service';
import { DecimalPipe } from '@angular/common';
import { AuthGuard } from './services/auth-guard.service';
import { AuthenticationService } from './services/authentication.service';
import { environment } from './../environments/environment';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { ProductFormComponent } from './product-form/product-form.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule} from '@angular/forms';
import { ProductTableComponent } from './product-table/product-table.component';
import { NgbdSortableDirective } from './sortable.directive';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ShoppingCartService } from './services/shopping-cart.service';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductFormComponent,
    AdminProductComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    ProductTableComponent,
    NgbdSortableDirective,
    ShoppingCartComponent,
    ShippingFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    NgbModule,
    AngularFireAuthModule,
    ToastsContainer,
  ],
  providers: [
    AuthenticationService,
    AuthGuard,
    DecimalPipe,
    CategoryService,
    DataTableService,
    ProductService,
    UserService,
    ShoppingCartService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
