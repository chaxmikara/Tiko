import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BASE_URL = 'http://localhost:3306/'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,) { }

  registerClient(singupRequestDTO:any): Observable<any> {
    return this.http.post(BASE_URL + "client/sign-up", singupRequestDTO);
  }
  registerCompany(singupRequestDTO:any): Observable<any> {
    return this.http.post(BASE_URL + "company/sign-up", singupRequestDTO);
  }
}
