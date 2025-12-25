import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private _HttpClient : HttpClient) { }

  myHeaders = { token: localStorage.getItem("userToken") || '' };

  CheckOut(cartId:string , shippingDetails:any):Observable<any>
  {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200` 
      ,{
        
        "shippingAddress": shippingDetails
      }
    );
  }

  getAllOrders(userId: string):Observable<any>
  {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/orders/user/${userId}`);
  }

}
