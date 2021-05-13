import { ProductService } from '../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrandService } from 'src/app/services/brand.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  id: number;
  name: string;
  size: string;
  comments: string;
  quantity_sctock: string;
  boarding_date: string;
  brand: string;
  product_image: string =
    'https://cdn.pixabay.com/photo/2015/10/12/15/18/clothing-store-984396_960_720.jpg';

  constructor(
    private aRoute: ActivatedRoute,
    private productService: ProductService,
    private brandService: BrandService
  ) {
    this.id = +this.aRoute.snapshot.paramMap.get('id');
    this.getProduct(this.id);
  }

  ngOnInit(): void {}
  getProduct(id: number): void {
    this.productService.getProduct(id).subscribe((data) => {
      this.id = data.product['id'];
      this.name = data.product['name'];
      this.size = data.product['size'];
      this.comments = data.product['comments'];
      this.quantity_sctock = data.product['cantidad_en_inventario'];
      this.boarding_date = data.product['boarding_date'];
      this.getBrand(data.product['brand_id']);
      if (data.product['product_image']) {
        this.product_image = data.product['product_image'];
      }
    });
  }

  getBrand(id: number) {
    this.brandService.getBrand(id).subscribe((data) => {
      this.brand = data.brand['name'];
    });
  }
}
