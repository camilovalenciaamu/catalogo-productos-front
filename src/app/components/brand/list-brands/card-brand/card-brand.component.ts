import { Component, Input, OnInit } from '@angular/core';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-card-brand',
  templateUrl: './card-brand.component.html',
  styleUrls: ['./card-brand.component.css'],
})
export class CardBrandComponent implements OnInit {
  @Input() brand: any = [];
  id: number;
  name: string;
  reference: string;

  brand_image: string =
    'https://cdn.pixabay.com/photo/2015/10/12/15/18/clothing-store-984396_960_720.jpg';

  constructor(private brandService: BrandService) {}

  ngOnInit(): void {
    this.id = this.brand.id;
    this.name = this.brand.name;
    this.reference = this.brand.reference;
    if (this.brand.brand_image) {
      this.brand_image = this.brand.brand_image;
    }
  }

  deleteBrand() {
    this.brandService.deleteBrand(this.id).subscribe((data) => {
      window.location.reload();
    });
  }
}
