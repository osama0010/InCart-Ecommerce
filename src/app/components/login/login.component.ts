import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private readonly _AuthService = inject(AuthService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);

  msgError: string = '';
  msgSuccess: boolean = false;
  isLoading: boolean = false;


  loginForm: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
  });


  loginSubmit(): void {
    if (this.loginForm.valid) {

      this.isLoading = true;

      this._AuthService.setloginForm(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          this.msgError = '';
          if (response.message == 'success') {
            setTimeout(() => {

              // 1. save token to localstorage
              localStorage.setItem('userToken', response.token);
              // 2. decode token to get user data
              this._AuthService.decodeUserToken();
              // 3. navigate to home
              this.msgSuccess = true;
              this._Router.navigate(['/home']);
            }, 3000);
          }
          this.isLoading = false;
        },
        error: (error: HttpErrorResponse) => {
          this.msgError = error.error.message;
          console.error('Registration failed:', error);
          this.isLoading = false;
        }
      });

    }
    else {
      this.loginForm.markAllAsTouched();
      this.loginForm.setErrors({ mismatch: true });
      this.msgError = 'Please fill out the form correctly.';
    }

  }


}
