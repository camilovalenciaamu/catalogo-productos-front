import { BrandService } from './../../../../services/brand.service';
import { Router } from '@angular/router';
import { ProductService } from '../../../../services/product.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.css'],
})
export class CardProductComponent implements OnInit {
  @Input() product: any = [];
  id: number;
  brand_id: number;
  name: string;
  size: string;
  brand: string;

  product_image: string =
    'https://cdn.pixabay.com/photo/2015/10/12/15/18/clothing-store-984396_960_720.jpg';

  constructor(
    private productService: ProductService,
    private brandService: BrandService
  ) {}

  ngOnInit(): void {
    this.id = this.product.id;
    this.brand_id = this.product.brand_id;
    this.name = this.product.name;
    this.size = this.product.size;
    this.getBrand(this.product.brand_id);
    if (this.product.product_image) {
      this.product_image = this.product.product_image;
    }
  }

  getBrand(id: number) {
    this.brandService.getBrand(id).subscribe((data) => {
      this.brand = data.brand['name'];
    });
  }

  deleteProduct() {
    this.productService.deleteProduct(this.id).subscribe((data) => {
      window.location.reload();
    });
  }
}
