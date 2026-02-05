import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  
private apiUrl = 'https://localhost:7247/api/orders';

  constructor(private http: HttpClient) {}

  createOrder(order: any) {
    return this.http.post(this.apiUrl, order);
  }
}
