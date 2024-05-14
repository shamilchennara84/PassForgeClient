import { HttpClient } from '@angular/common/http';
import {
  Component,
  inject,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Password } from '../../services/pwdPayload.model';
import { PasswordService } from '../../services/password.service';

@Component({
  selector: 'app-password-generator',
  templateUrl: './password-generator.component.html',
  styleUrls: ['./password-generator.component.scss'],
})
export class PasswordGeneratorComponent implements OnChanges {
  password = '';
  passwordLength = 0;
  useLetters = false;
  useNumbers = false;
  useSymbols = false;
  copySuccess = false;
  passwordDescription: string = '';
  isSaveModalOpen: boolean = false;
  http = inject(HttpClient);

  constructor(private passwordService: PasswordService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['passwordLength'] ||
      changes['useLetters'] ||
      changes['useNumbers'] ||
      changes['useSymbols']
    ) {
      console.log('change');
      this.isFormValid();
    }
  }

  isFormValid() {
    return (
      this.passwordLength !== 0 &&
      (this.useLetters || this.useNumbers || this.useSymbols)
    );
  }

  onChangeLength(value: string) {
    const parsedValue = parseInt(value);

    if (!isNaN(parsedValue)) {
      this.passwordLength = parsedValue;
    }
  }

  generatePassword() {
    const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_-,.';
    let availableCharacters = '';

    if (this.useLetters) {
      availableCharacters += lowerCaseLetters;
      availableCharacters += upperCaseLetters;
    }

    if (this.useNumbers) {
      availableCharacters += numbers;
    }

    if (this.useSymbols) {
      availableCharacters += symbols;
    }

    const generatedPassword = [];

    for (let i = 0; i < this.passwordLength; i++) {
      const max = availableCharacters.length;
      const ran = Math.random();
      const idx = Math.floor(ran * (max + 1));

      generatedPassword.push(availableCharacters[idx]);
    }

    this.password = generatedPassword.join('');
  }

  copyToClipboard() {
    navigator.clipboard
      .writeText(this.password)
      .then(() => {
        this.copySuccess = true;
        setTimeout(() => {
          this.copySuccess = false;
        }, 1000);
      })
      .catch((err) => {
        console.error('Could not copy text: ', err);
      });
  }

  openSaveModal() {
    this.isSaveModalOpen = true;
  }

  closeSaveModal() {
    this.isSaveModalOpen = false;
  }

  savePassword() {
    const passwordPayload: Password = {
      password: this.password,
      description: this.passwordDescription,
    };
    const loggedUser = JSON.parse(sessionStorage.getItem('loggedUser')!);
    const userEmail = loggedUser.email;
    this.passwordService.addPassword(passwordPayload, userEmail).subscribe({
      next: (newPassword) => {
        this.isSaveModalOpen = false;
      },
      error: (error: Error) => console.error('Failed to add password', error),
    });
  }
}
