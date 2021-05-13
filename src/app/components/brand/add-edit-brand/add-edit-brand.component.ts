import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AddBrandI } from 'src/app/models/brand.interface';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-add-edit-brand',
  templateUrl: './add-edit-brand.component.html',
  styleUrls: ['./add-edit-brand.component.css'],
})
export class AddEditBrandComponent implements OnInit {
  brandForm: FormGroup;
  brand_alert = '';
  brand_success = '';
  loading: boolean = false;
  brand_id: number;
  action: string = 'Agregar';
  public format: string = 'yyyy-MM-dd HH:mm';
  constructor(
    private brandService: BrandService,
    private formBuilder: FormBuilder,
    private aRoute: ActivatedRoute,
    private router: Router
  ) {
    this.brandForm = this.formBuilder.group({
      name: ['', Validators.required],
      reference: ['', Validators.required],
      brand_image: ['', Validators.required],
    });

    this.brand_id = this.aRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    if (this.brand_id !== undefined) {
      this.action = 'Editar';
      this.fillEditProduct();
    }
  }

  fillEditProduct() {
    this.brandService.getBrandForFillEdit(this.brand_id).subscribe((data) => {
      this.brandForm.patchValue({
        name: data.brand['name'],
        reference: data.brand['reference'],
        brand_image: data.brand['brand_image'],
      });
    });
  }

  saveBrand(values: any) {
    this.loading = true;

    let brand: AddBrandI = {
      name: values.name,
      reference: values.reference,
      brand_image: values.brand_image,
    };

    if (this.brand_id !== undefined) {
      this.editBrand(brand);
    } else {
      this.addBrand(brand);
    }
  }

  addBrand(brand: AddBrandI) {
    this.brandService.addBrand(brand).subscribe(
      (resp) => {
        this.brand_success = 'Marca creada exitosamente';
        setTimeout(() => {
          this.brand_success = '';
          this.loading = false;
        }, 5000);
        this.router.navigateByUrl('dashboard/marcas');
      },
      (err) => {
        this.resolveError(err);
      }
    );
  }
  editBrand(brand: AddBrandI) {
    this.brandService.editBrand(this.brand_id, brand).subscribe(
      (resp) => {
        this.brand_success = 'Marca actualizada exitosamente';
        setTimeout(() => {
          this.brand_success = '';
        }, 5000);
        this.router.navigateByUrl('dashboard/marcas');
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
        const control = this.brandForm.controls[key];
        if (control) {
          control.setErrors({ custom: e[key][0] });
        }
      });
    }
  }

  getError(field: string) {
    if (this.brandForm?.controls[field].hasError('custom')) {
      return this.brandForm.controls[field].errors?.custom;
    }

    return null;
  }
}
