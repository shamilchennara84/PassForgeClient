import { inject, Injectable } from '@angular/core';
import { PasswordRes } from './pwdPayload.model';
import { PasswordService } from './password.service';
import { MaybeAsync, Resolve } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PasswordResolverService {
  constructor(private passwordService: PasswordService) {}

  resolve() {
    return this.passwordService.fetchAllPasswords(); // Assuming fetchPasswords returns an Observable<PasswordRes[]>
  }
}

// Functional resolver
export const passwordResolver = () => inject(PasswordResolverService).resolve();
