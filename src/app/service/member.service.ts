import { Photo } from './../model/photo';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from '../model/member';
import { Members } from '../model/members';

interface HttpOptions {
	headers: HttpHeaders;
	params?: {};
}
@Injectable({
  providedIn: 'root'
})
export class MemberService {
  public httpOptions: HttpOptions = {	
    headers:  new HttpHeaders
  };
  constructor(private http: HttpClient) { 
    let currentUser = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('User'))));
    if (currentUser) {
      let token = currentUser['token'];
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json; multipart/form-data',
          Authorization: `Bearer ${token}`
        })
      };
    //  this.currentUserSoucre.next(currentUser);
    }

  }

  getAllMember(): Observable<Members> {
    return this.http.get<Members>(environment.rootUrl + 'UsersControllers');
  }

  getMemberById(id: number): Observable<Member> {
    return this.http.get<Member>(environment.rootUrl + `UsersControllers/${id}`);
  }

  getMemberByUserName(userName: string): Observable<Member> {
    return this.http.get<Member>(environment.rootUrl + `UsersControllers/getUserByName/${userName}`);
  } 

  updateMemberById(member: Member): Observable<Member> {
    return this.http.put<Member>(environment.rootUrl + `UsersControllers/updateMember`, member);
  }

  setMainPhoto(id: number):  Observable<Photo>{
    return this.http.post<Photo>(environment.rootUrl + `UsersControllers/set-main-photo/${id}`, id);
  }

  deletePhoto(id: number):  Observable<Photo>{
    return this.http.post<Photo>(environment.rootUrl + `UsersControllers/delete-photos/${id}`, id);
  }
}
