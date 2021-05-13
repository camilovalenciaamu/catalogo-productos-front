import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ProductComponent } from './components/product/product.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardProductComponent } from './components/product/list-products/card-product/card-product.component';
import { ListProductsComponent } from './components/product/list-products/list-products.component';
import { AddEditProductComponent } from './components/product/add-edit-product/add-edit-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SpinnerComponent } from './components/shared/spinner/spinner.component';
import { BrandComponent } from './components/brand/brand.component';
import { ListBrandsComponent } from './components/brand/list-brands/list-brands.component';
import { CardBrandComponent } from './components/brand/list-brands/card-brand/card-brand.component';
import { AddEditBrandComponent } from './components/brand/add-edit-brand/add-edit-brand.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FooterComponent,
    NavbarComponent,
    ListProductsComponent,
    LayoutComponent,
    CardProductComponent,
    ProductComponent,
    LoadingComponent,
    AddEditProductComponent,
    SpinnerComponent,
    BrandComponent,
    ListBrandsComponent,
    CardBrandComponent,
    AddEditBrandComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    DateTimePickerModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
