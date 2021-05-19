import { Router, Routes } from '@angular/router';
import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userName = new FormControl('');
  passWord = new FormControl('');
  constructor(private authService: AuthService,  private routes: Router) { }

  ngOnInit(): void {
  }

  register() {
    const user = {
      userName: this.userName.value,
      passWord: this.passWord.value
    }
    this.authService.register(user).subscribe((res) => {
        this.routes.navigate(['/auth/login']);
    })
  }

}
