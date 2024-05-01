import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Password, PasswordRes } from './pwdPayload.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  private apiUrl = environment.apiUrl;
  private passwordsSubject = new BehaviorSubject<PasswordRes[]>([]);
  passwords$ = this.passwordsSubject.asObservable();

  constructor(private http: HttpClient) {}

  addPassword(payload: Password, userEmail: string): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/add/${userEmail}`, payload)
      .pipe(tap(() => this.fetchAllPasswords()));
  }

  deletePassword(passwordId: string, userEmail: string): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}/delete/${passwordId}/${userEmail}`)
      .pipe(tap(() => this.fetchAllPasswords()));
  }

  fetchAllPasswords(): void {
    const loggedUser = JSON.parse(sessionStorage.getItem('loggedUser')!);
    const userEmail = loggedUser.email;
    this.http
      .get<PasswordRes[]>(`${this.apiUrl}/fetch`, {
        params: { email: userEmail },
      })
      .subscribe({
        next: (passwords: PasswordRes[]) =>
          this.passwordsSubject.next(passwords),
        error: (error: Error) =>
          console.error('Failed to fetch passwords', error),
      });
  }
}
