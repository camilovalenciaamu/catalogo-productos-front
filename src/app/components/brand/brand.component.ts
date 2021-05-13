import { BrandService } from './../../services/brand.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent implements OnInit {
  id: number;
  name: string;
  reference: string;
  brand_image: string =
    'https://cdn.pixabay.com/photo/2015/10/12/15/18/clothing-store-984396_960_720.jpg';

  constructor(
    private aRoute: ActivatedRoute,
    private brandService: BrandService
  ) {
    this.id = +this.aRoute.snapshot.paramMap.get('id');
    this.getBrand(this.id);
  }

  ngOnInit(): void {}
  getBrand(id: number): void {
    this.brandService.getBrand(id).subscribe((data) => {
      this.id = data.brand['id'];
      this.name = data.brand['name'];
      this.reference = data.brand['reference'];
      if (data.brand['brand_image']) {
        this.brand_image = data.brand['brand_image'];
      }
    });
  }
}
