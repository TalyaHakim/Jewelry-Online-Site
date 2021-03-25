import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }

  getAllProducts(): Observable <Product[]> {
    return this.http.get<Product[]>(`${environment.Api}/products`);
  }
  
  reaplyFilter(name: { [key: string]: string}): Observable <Product[]> {
    return this.http.post<Product[]>(`${environment.Api}/products/filter`,name)
  }

}
