import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { observable, Observable } from 'rxjs';
//localhost:3306
const BASE_URL = 'http://localhost:8096/';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 

  constructor(private http: HttpClient) { }

  registerClient(signupRequestDTO: any): Observable<any> {
    return this.http.post(BASE_URL + 'client/sign-up', signupRequestDTO);
  }
  registerCompany(signupRequestDTO: any): Observable<any> {
    return this.http.post(BASE_URL + 'company/sign-up', signupRequestDTO);
  }

}