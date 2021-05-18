import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rootUrl = 'https://localhost:5001/api/'
  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
    return this.http.post(this.rootUrl + 'Account/login', data).pipe(
      map((response: any) => {
        const user = response;
        if(user) {
          localStorage.setItem('User', JSON.stringify(user));
        }
      }
    ));
  }

}
