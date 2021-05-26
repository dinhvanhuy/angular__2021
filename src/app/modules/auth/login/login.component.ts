import { Routes, Params, ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { AppGlobalService } from 'src/app/shared/commons/app-global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin!: FormGroup;
  isSubmit = false

  constructor(private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    public appGlobal: AppGlobalService
    ) { }
  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      userName : ['', Validators.required],
      passWord: ['', Validators.required]
    })

  }

  get f() {
    return this.formLogin.controls;
  }

  login(): void {
    this.isSubmit = true;
    if(this.formLogin.dirty) return;
    this.authService.login(this.formLogin.value).subscribe((res) => {
      this.router.navigate(['/member'], {relativeTo: null});
    }, err => {
      console.log(err);
    });
  }


}
