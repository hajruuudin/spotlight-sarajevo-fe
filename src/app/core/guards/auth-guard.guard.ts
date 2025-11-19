import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SessionService } from '../services/session.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const session = inject(SessionService);
  const router = inject(Router);

  if (session.getStoredUser()) return true;

  return session.restoreSession().pipe(
    map(isValid => isValid ? true : router.createUrlTree(['/auth/login']))
  );
};

