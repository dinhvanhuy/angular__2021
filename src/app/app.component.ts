import { NavComponent } from './components/nav/nav.component';
import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private http: HttpClient ) {

  }


  ngOnInit(): void {
      this.http.get('https://localhost:5001/api/UsersControllers').subscribe((data) => {
        console.log(data);
      })
  }
  title = 'my-app';

}
