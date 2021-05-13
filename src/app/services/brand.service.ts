import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  AddBrandI,
  GetBrandForFillEditI,
  GetBrandI,
} from '../models/brand.interface';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  constructor(private http: HttpClient) {}
  private baseUrl: string = 'http://localhost:8000/api/v1';

  public getBrandForFillEdit(id: number): Observable<GetBrandForFillEditI> {
    return this.http.get<GetBrandForFillEditI>(`${this.baseUrl}/marca/${id}`);
  }
  public deleteBrand(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/borrar-marca/${id}`);
  }

  public addBrand(Brand: AddBrandI) {
    return this.http
      .post<AddBrandI>(`${this.baseUrl}/marca`, Brand)
      .pipe(catchError(this.handleError));
  }

  public editBrand(id: number, Brand: AddBrandI) {
    return this.http
      .put<AddBrandI>(`${this.baseUrl}/actualizar-marca/${id}`, Brand)
      .pipe(catchError(this.handleError));
  }

  public getBrands(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/marcas`);
  }
  public getBrand(id: number): Observable<GetBrandI> {
    return this.http.get<GetBrandI>(`${this.baseUrl}/marca/${id}`);
  }

  private handleError(errorResponse: HttpErrorResponse) {
    return throwError(errorResponse);
  }
}
