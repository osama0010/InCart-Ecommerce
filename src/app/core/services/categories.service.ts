import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/enviroment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private _HttpClient:HttpClient) { } // or inject(HttpClient)

  getAllCategories():Observable<any>
  {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/categories`);
  }

    getSpecificCategory(id:string):Observable<any>
  {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/categories${id}`);
  }

}
