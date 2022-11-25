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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductTableComponent } from './product-table/product-table.component';
import { NgbdSortableDirective } from './sortable.directive';


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
    NgbdSortableDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    NgbModule,
    AngularFireAuthModule,
  ],
  providers: [AuthenticationService,
  AuthGuard, DecimalPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
