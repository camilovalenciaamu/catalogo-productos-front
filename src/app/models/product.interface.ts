export interface GetProductI {
  id: number;
  product: { product: [] };
}
export interface GetProductForFillEditI {
  id: number;
  product: { product: [] };
  name: string;
  size: string;
  brand_id: number;
  comments: string;
  quantity_stock: number;
  product_image: string;
  boarding_date: string;
}
export interface AddProductI {
  name: string;
  size: string;
  brand_id: number;
  comments: string;
  quantity_stock: number;
  product_image: string;
  boarding_date: string;
}
