import { HttpClient, HttpHeaders, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

interface HttpOptions {
	headers: HttpHeaders;
	params?: {};
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rootUrl = 'https://localhost:5001/api/';
  public httpOptions: HttpOptions = {	
    headers:  new HttpHeaders
  };
  token = JSON.parse(JSON.stringify('User'))['token'];

  currentUserSoucre =  new ReplaySubject<any>(1);
  currentUser$ = this.currentUserSoucre.asObservable();
  constructor(private http: HttpClient) { 
   
    let currentUser = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('User'))));
    if (currentUser) {
      let token = currentUser['token'];
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          Authorization: `Bearer ${token}`
        })
      };
      this.currentUserSoucre.next(currentUser);
    }
    
  }

  login(data: any): Observable<any> {
    return this.http.post(this.rootUrl + 'Account/login', data).pipe(
      map((response: any) => {
        const user = response;
        if(user) {
          localStorage.setItem('User', JSON.stringify(user));
          this.currentUserSoucre.next(user);
        }
      }
    ));
  }

  setCurrentUser(user: any) {
    this.currentUserSoucre.next(user);
  }


  register(data: any): Observable<any>{
    return this.http.post(this.rootUrl + 'Account/register', data)
  }

  logout() {
    localStorage.clear();
    this.currentUserSoucre.next(null);
  }

  
  getUser(id: number) : Observable<any>{
   
    return this.http.get(this.rootUrl+ `UsersControllers/${id}`
    //, this.httpOptions
		);
  }

}
