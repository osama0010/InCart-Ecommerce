import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const logedGuard: CanActivateFn = (route, state) => {

  const _Router = inject(Router);

  if (typeof localStorage !== 'undefined') {

    if (localStorage.getItem('userToken') !== null) {
      // user is logged → prevent visiting login/register
      _Router.navigate(['/home']);
      return false;
    } else {
      // user not logged → allow login/register
      return true;
    }
  }
    else {
      return true;
    }


};
