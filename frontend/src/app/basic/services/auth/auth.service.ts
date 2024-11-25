import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { UserStorageService } from '../storage/user-storage.service';

const BASE_URL = 'http://localhost:8096/';
export const AUTH_HEADER = 'Authorization';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient,
    private userStorageService: UserStorageService) { }

  registerClient(signupRequestDTO: any): Observable<any> {
    return this.http.post(BASE_URL + 'client/sign-up', signupRequestDTO);
  }

  registerCompany(signupRequestDTO: any): Observable<any> {
    return this.http.post(BASE_URL + 'company/sign-up', signupRequestDTO);
  }

  login(name: string, password: string): Observable<HttpResponse<any>> {
    return this.http.post(BASE_URL + "authenticate", { name, password }, { observe: 'response' })
      .pipe(
        map((res: HttpResponse<any>) => {
          console.log(res.body)
          this.userStorageService.saveUser(res.body);
          const tokenLength = res.headers.get(AUTH_HEADER)?.length;
          const bearerToken = res.headers.get(AUTH_HEADER)?.substring(7, tokenLength);
          console.log(bearerToken);
          this.userStorageService.saveToken(res.body);
          return res;
        })
      );
  }
}
