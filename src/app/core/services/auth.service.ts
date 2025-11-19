import { HttpClient, HttpClientModule } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/enviroment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // httpclient   --->  import app.config
  // constructor(private _HttpClient:HttpClient) { }

  private readonly _HttpClient = inject(HttpClient);
  private readonly _Router = inject(Router);
  
  userData:any = null;


  setRegisterForm(data: object): Observable<any>
  {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signup`, data);
  }

  setloginForm(data: object): Observable<any>
  {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signin`, data);
  }

  decodeUserToken(): void
  {
    // get token from localstorage
    if(localStorage.getItem('userToken') !== null){
      // decode token to get user data
    this.userData = jwtDecode(localStorage.getItem('userToken')!);
    console.log(this.userData);
    }
  }


  logOut(): void
  {
    // remove token from localstorage
    localStorage.removeItem('userToken');
    this.userData = null;
    // Call Api remove token from backend
    
    // redirect to login page
    this._Router.navigate(['/login']);
  }

}
