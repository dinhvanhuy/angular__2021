import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

 
  formRegister !: FormGroup;
  constructor(private authService: AuthService,
      private routes: Router,
      private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formRegister = this.fb.group({
      userName: ['', Validators.required],
      passWord: ['', Validators.required]
    });
  }

  register() {
    if (this.formRegister.invalid) {
			return;
		}
    this.authService.register(this.formRegister.value).subscribe(() => {
        this.routes.navigate(['/member'], {relativeTo: null} );
    })
  }

}
