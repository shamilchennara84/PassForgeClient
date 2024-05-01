import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanActivateFn,
} from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean | UrlTree => {
  const router = inject(Router); // Inject Router for usage

  const loggedUser = sessionStorage.getItem('loggedUser');

  if (!loggedUser) {
    // No logged user, redirect to signup
    router.navigate(['/signup']);
    return false;
  }

  try {
    const userToken = JSON.parse(loggedUser);
    const currentTime = Date.now() / 1000;

    if (userToken.exp < currentTime) {
      // Token expired, remove and redirect
      sessionStorage.removeItem('loggedUser');
      router.navigate(['/signup']);
      return false;
    }

    // Token valid, allow access
    return true;
  } catch (error) {
    // Invalid token, remove and redirect
    sessionStorage.removeItem('loggedUser');
    router.navigate(['/signup']);
    return false;
  }
};
