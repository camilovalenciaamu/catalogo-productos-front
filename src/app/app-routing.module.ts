import { BrandComponent } from './components/brand/brand.component';
import { AddEditBrandComponent } from './components/brand/add-edit-brand/add-edit-brand.component';
import { AddEditProductComponent } from './components/product/add-edit-product/add-edit-product.component';
import { ProductComponent } from './components/product/product.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ListProductsComponent } from './components/product/list-products/list-products.component';
import { ListBrandsComponent } from './components/brand/list-brands/list-brands.component';

const routes: Routes = [
  { path: '', redirectTo: 'layout', pathMatch: 'full' },
  { path: 'layout', component: LayoutComponent },
  { path: 'agregar-producto', component: AddEditProductComponent },
  { path: 'actualizar-producto/:id', component: AddEditProductComponent },
  { path: 'agregar-marca', component: AddEditBrandComponent },
  { path: 'actualizar-marca/:id', component: AddEditBrandComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'productos',
        component: ListProductsComponent,
      },
      {
        path: 'producto/:id',
        component: ProductComponent,
      },
      {
        path: 'marcas',
        component: ListBrandsComponent,
      },
      {
        path: 'marca/:id',
        component: BrandComponent,
      },
    ],
  },
  { path: '**', redirectTo: 'layout', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
