import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LoginService } from '../services/login/login.service';

export const authGuard: CanActivateFn = (route, state) => {

  if (typeof window === 'undefined') {
    return false;
  }

  const authService = inject(LoginService);
  if (authService.isAuthenticated()) {
    return true;
  } else {
    authService.logout();
    return false;
  }
};
