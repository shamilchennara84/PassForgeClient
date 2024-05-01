import { Component } from '@angular/core';
import {  PasswordRes } from '../../services/pwdPayload.model';
import { PasswordService } from '../../services/password.service';

@Component({
  selector: 'app-list-password',
  templateUrl: './list-password.component.html',
  styleUrl: './list-password.component.scss',
})
export class ListPasswordComponent {
  passwords: PasswordRes[] = [];

  constructor(private passwordService: PasswordService) {}

  ngOnInit(): void {
    this.passwordService.passwords$.subscribe((passwords) => {
      this.passwords = passwords;
    });
  }

  deletePassword(passwordId: string): void {
    this.passwordService.deletePassword(passwordId).subscribe(
      () => {
        // Optionally, show a success message or refresh the list
      },
      (error) => {
        console.error('Failed to delete password', error);
      }
    );
  }
}
