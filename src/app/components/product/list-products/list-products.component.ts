import { ProductService } from '../../../services/product.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
})
export class ListProductsComponent implements OnInit {
  loading: boolean = true;
  list_products: any = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts() {
    this.productService.getProducts().subscribe((data) => {
      this.list_products = data;
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    });
  }
}
