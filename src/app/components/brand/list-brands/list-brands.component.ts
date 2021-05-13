import { Component, OnInit } from '@angular/core';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-list-brands',
  templateUrl: './list-brands.component.html',
  styleUrls: ['./list-brands.component.css'],
})
export class ListBrandsComponent implements OnInit {
  loading: boolean = true;
  list_brands: any = [];

  constructor(private brandService: BrandService) {}

  ngOnInit(): void {
    this.getBrands();
  }
  getBrands() {
    this.brandService.getBrands().subscribe((data) => {
      this.list_brands = data;
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    });
  }
}
