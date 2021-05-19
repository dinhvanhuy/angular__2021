import { Observable } from 'rxjs';
import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  username = '';
  isLogin = false;
  currentUser$ =  new Observable<any>();
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(res => {
      if(res) {
        if(res.userName) {
          this.username = res.userName;
          this.isLogin = true;
        }
      }
    })
  }

  logout() {
    this.authService.logout();
    this.authService.currentUser$.subscribe(res => {
      this.currentUser$ =  res;
    })

  }

}
