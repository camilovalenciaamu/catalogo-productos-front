export interface GetBrandI {
  id: number;
  brand: { brand: [] };
  name: string;
  reference: string;
}
export interface GetBrandForFillEditI {
  id: number;
  brand: { brand: [] };
  name: string;
  reference: string;
  brand_image: string;
}
export interface AddBrandI {
  name: string;
  reference: string;
  brand_image: string;
}
