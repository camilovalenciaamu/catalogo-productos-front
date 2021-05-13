import { BrandService } from './../../../services/brand.service';
import { AddProductI } from '../../../models/product.interface';
import { ProductService } from '../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css'],
  providers: [DatePipe],
})
export class AddEditProductComponent implements OnInit {
  brands: any = [];
  sizes: any = ['S', 'M', 'L'];
  productForm: FormGroup;
  product_alert = '';
  product_success = '';
  loading: boolean = false;
  product_id: number;
  action: string = 'Agregar';
  public format: string = 'yyyy-MM-dd HH:mm';
  constructor(
    private productService: ProductService,
    private brandService: BrandService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private router: Router,
    private aRoute: ActivatedRoute
  ) {
    this.getBrands();
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      size: ['', Validators.required],
      brand_id: ['', Validators.required],
      boarding_date: ['', Validators.required],
      quantity_stock: ['', Validators.required],
      comments: ['', Validators.required],
      product_image: ['', Validators.required],
    });

    this.product_id = this.aRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    if (this.product_id !== undefined) {
      this.action = 'Editar';
      this.fillEditProduct();
    }
  }

  getBrands() {
    this.brandService.getBrands().subscribe((brands) => {
      this.brands = brands;
    });
  }
  fillEditProduct() {
    this.productService
      .getProductForFillEdit(this.product_id)
      .subscribe((data) => {
        this.productForm.patchValue({
          name: data.product['name'],
          brand_id: data.product['brand_id'],
          size: data.product['size'],
          boarding_date: data.product['boarding_date'],
          quantity_stock: data.product['quantity_stock'],
          product_image: data.product['product_image'],
          comments: data.product['comments'],
        });
      });
  }

  saveProduct(values: any) {
    this.loading = true;
    let formated_date;
    if (values.quantity_stock) {
      formated_date = this.datePipe.transform(
        new Date(values.boarding_date),
        this.format
      );
    }

    let product: AddProductI = {
      name: values.name,
      brand_id: values.brand_id,
      size: values.size,
      boarding_date: formated_date,
      quantity_stock: values.quantity_stock,
      product_image: values.product_image,
      comments: values.comments,
    };

    if (this.product_id !== undefined) {
      this.editProduct(product);
    } else {
      this.addProduct(product);
    }
  }

  addProduct(product: AddProductI) {
    this.productService.addProduct(product).subscribe(
      (resp) => {
        this.product_success = 'Producto creado exitosamente';
        setTimeout(() => {
          this.product_success = '';
          this.loading = false;
        }, 5000);
        this.router.navigateByUrl('dashboard/productos');
      },
      (err) => {
        this.resolveError(err);
      }
    );
  }
  editProduct(product: AddProductI) {
    this.productService.editProduct(this.product_id, product).subscribe(
      (resp) => {
        this.product_success = 'Producto actualizado exitosamente';
        setTimeout(() => {
          this.product_success = '';
        }, 5000);
        this.router.navigateByUrl('dashboard/productos');
      },
      (err) => {
        this.resolveError(err);
      }
    );
  }

  resolveError(err: any) {
    this.loading = false;
    let e = err.error.errors;
    if (e) {
      let keys = Object.keys(err.error.errors);

      keys.forEach((key) => {
        const control = this.productForm.controls[key];
        if (control) {
          control.setErrors({ custom: e[key][0] });
        }
      });
    }
  }

  getError(field: string) {
    if (this.productForm?.controls[field].hasError('custom')) {
      return this.productForm.controls[field].errors?.custom;
    }

    return null;
  }
}
