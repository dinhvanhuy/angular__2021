import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName = new FormControl('');
  passWord = new FormControl('');
  
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  login(): void {
    console.log(this.userName.value, this.passWord.value);
    const user = {
      userName:this.userName.value,
      passWord: this.passWord.value
    }
    this.authService.login(user).subscribe((res) => {
       this.authService
    }, err => {
      console.log(err);
    });
  }



}
