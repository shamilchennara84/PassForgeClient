import { Component, OnDestroy } from '@angular/core';
import { PasswordRes } from '../../services/pwdPayload.model';
import { PasswordService } from '../../services/password.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-list-password',
  templateUrl: './list-password.component.html',
  styleUrl: './list-password.component.scss',
})
export class ListPasswordComponent implements OnDestroy {
  passwords: PasswordRes[] = [];
  private destroy$ = new Subject<void>();

  constructor(private passwordService: PasswordService) {}

  ngOnInit(): void {
    this.passwordService.passwords$.subscribe((passwords) => {
      this.passwords = passwords;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  deletePassword(passwordId: string): void {
    const loggedUser = JSON.parse(sessionStorage.getItem('loggedUser')!);
    const userEmail = loggedUser.email;
    this.passwordService.deletePassword(passwordId, userEmail).subscribe({
      next: () => {
        console.log('deleted');
      },
      error: (error: Error) =>
        console.error('Failed to delete password', error),
    });
  }
}
