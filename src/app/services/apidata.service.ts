import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApidataService {
  constructor(private _HttpClient: HttpClient) {}

  getProducts():Observable<any>{
    return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/products`
    );
  }
  getProductsById(id:string|null):Observable<any>{
    return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
  }

  getCategories():Observable<any>{
    return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/categories`
    );
  }

}
