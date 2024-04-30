import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-password-generator',
  templateUrl: './password-generator.component.html',
  styleUrl: './password-generator.component.scss',
})
export class PasswordGeneratorComponent implements OnInit {
  password: string = '';
  passwordLength: number = 12;
  includeNumbers: boolean = true;
  includeUppercase: boolean = true;
  includeLowercase: boolean = true;
  includeSpecialChars: boolean = true;

  ngOnInit(): void {
    this.generatePassword();
  }

  generatePassword(): void {
    let chars =
      'abcdefghijklmnopqrstuvwxyz';
    let password = '';

    if (this.includeNumbers) {
      chars += '0123456789';
    }
    if (this.includeUppercase) {
      chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    if (this.includeSpecialChars) {
      chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    }

    for (let i = 0; i < this.passwordLength; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    this.password = password;
  }
}
