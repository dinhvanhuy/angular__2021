import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.css']
})
export class TestErrorComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {

  }

  notfound() {
    this.httpClient.get('https://localhost:5001/api/Buggy/not-found').subscribe(res => {
      console.log(res);
    }, err =>{
      console.log(err)
    })
  }

  badRequest() {
    this.httpClient.get('https://localhost:5001/api/Buggy/bad-request').subscribe(res => {
      console.log(res);
    }, err =>{
      console.log(err)
    })
  }
  serverError() {
    this.httpClient.get('https://localhost:5001/api/Buggy/server-error').subscribe(res => {
      console.log(res);
    }, err =>{
      console.log(err)
    })
  }
  authenation() {
    this.httpClient.get('https://localhost:5001/api/Buggy/auth').subscribe(res => {
      console.log(res);
    }, err =>{
      console.log(err)
    })
  }

}
