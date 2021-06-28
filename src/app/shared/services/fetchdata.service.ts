import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../interfaces/products';

@Injectable({
  providedIn: 'root'
})
export class FetchdataService {
  url="https://product-subscription.herokuapp.com/api/products"
  constructor(private http:HttpClient) { }
  fetch():Observable<Product>{
    return this.http.get<Product>(this.url)
  }
}
