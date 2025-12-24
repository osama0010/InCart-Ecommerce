import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {

  const toastr = inject(ToastrService);

  // Request handling
  
  return next(req).pipe( catchError( (error) => {

    // Error handling

    console.error('Interceptor error:', error);

    toastr.error(error.error.message || 'An unexpected error occurred.', 'FreshCart', {
      timeOut: 5000,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-top-right'
    });

    return throwError(() => error);
  }));
};
