import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'environment/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/home/search/search.component';
import { TagsComponent } from './pages/home/tags/tags.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AdminComponent } from './pages/admin/admin.component';
import {
  ConfirmDialog,
  ProductsComponent,
} from './pages/admin/products/products.component';
import { CustomerComponent } from './pages/admin/customer/customer.component';
import { CategoriesComponent } from './pages/admin/categories/categories.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NewProductDialogComponent } from './pages/admin/products/new-product-dialog/new-product-dialog.component';
import { ProductComponent } from './pages/product/product.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CartComponent } from './pages/cart/cart.component';
import { HeaderComponent } from './shared/header/header.component';
import { CommentFormComponent } from './pages/product/comment-form/comment-form.component';
import { CommentComponent } from './pages/product/comment/comment.component';
import { EmptyCartComponent } from './pages/cart/empty-cart/empty-cart.component';
import { MatOption } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    SearchComponent,
    TagsComponent,
    AdminComponent,
    ProductsComponent,
    CustomerComponent,
    CategoriesComponent,
    NewProductDialogComponent,
    HeaderComponent,
    ProductComponent,
    ProfileComponent,
    CartComponent,
    CommentFormComponent,
    CommentComponent,
    EmptyCartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    ConfirmDialog,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
