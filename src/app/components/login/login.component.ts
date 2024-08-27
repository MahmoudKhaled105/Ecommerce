import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { JsonPipe, NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';
// import { Router } from 'express';
import { Route, Router, RouterModule, RouterOutlet } from '@angular/router';
import { Token } from '@angular/compiler';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, NgIf /*RouterOutlet, RouterModule*/],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private _AuthService: AuthService, private _Router: Router) {}

  isLoading: boolean = false;
  errorMessage: string = '';

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\w{6,}$/),
    ]),
  });

  handelLogin(): void {
    this.isLoading=true;
    if (this.loginForm.valid) {
      this._AuthService.loginForm(this.loginForm.value).subscribe({
        next: (response) => {
          // console.log(response);
          if (response.message === 'success') {
            localStorage.setItem("_token", response.token);
            this.isLoading = false;
            this._Router.navigate(['/home']);
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err.error.message;
        },
      });
    }
  }
}
