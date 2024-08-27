import { Component } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { JsonPipe, NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';
// import { Router } from 'express';
import { Route, Router, RouterModule, RouterOutlet } from '@angular/router';
// import {Router} from 'express';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, NgIf /*RouterOutlet, RouterModule*/],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(private _AuthService: AuthService, private _Router: Router) {}

  isLoading: boolean = false;
  errorMessage: string = '';

  regitserForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\w{6,}$/),
    ]),
    rePassword: new FormControl(''),
    // [                      ==> wll make a custom validation
    // Validators.required,
    // Validators.pattern(/^\w{6,}$/),]

    phone: new FormControl('', [
      (Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)),
    ]),
  }, {validators:[this.confirmPassowrd]} as FormControlOptions );

  //custom validation ---> have a parameter  -- group --- registerForm
  confirmPassowrd(group: FormGroup): void {
    const password = group.get('password');
    const rePassword = group.get('rePassword');

    if(rePassword?.value === ''){   // => required
      rePassword.setErrors({required:true});
    }
    else if (password?.value !== rePassword?.value) {
      //repassword not equal password
      rePassword?.setErrors({ misMatch: true });
    }
  }

  handelRegister(): void {
    if (this.regitserForm.valid) {
      this._AuthService.registerForm(this.regitserForm.value).subscribe({
        next: (response) => {
          // console.log(response);
          if (response.message === 'success') {
            this._Router.navigate(['/login']);
          }
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = err.error.message;
          this.isLoading = false;
        },
      });
    }
  }
}
