import { GetProductForFillEditI } from './../models/product.interface';
import { GetProductI, AddProductI } from '../models/product.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  private baseUrl: string = 'http://localhost:8000/api/v1';

  public getProducts(): Observable<GetProductI> {
    return this.http.get<GetProductI>(`${this.baseUrl}/productos`);
  }

  public getProduct(id: number): Observable<GetProductI> {
    return this.http.get<GetProductI>(`${this.baseUrl}/producto/${id}`);
  }
  public getProductForFillEdit(id: number): Observable<GetProductForFillEditI> {
    return this.http.get<GetProductForFillEditI>(
      `${this.baseUrl}/producto/${id}`
    );
  }
  public deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/borrar-producto/${id}`);
  }

  public addProduct(product: AddProductI) {
    return this.http
      .post<AddProductI>(`${this.baseUrl}/producto`, product)
      .pipe(catchError(this.handleError));
  }

  public editProduct(id: number, product: AddProductI) {
    return this.http
      .put<AddProductI>(`${this.baseUrl}/actualizar-producto/${id}`, product)
      .pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    return throwError(errorResponse);
  }
}
