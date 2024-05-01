import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Password, PasswordRes } from './pwdPayload.model';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  private apiUrl = 'YOUR_BACKEND_ENDPOINT_HERE';
  private passwordsSubject = new BehaviorSubject<PasswordRes[]>([]);
  passwords$ = this.passwordsSubject.asObservable();

  constructor(private http: HttpClient) {}

  addPassword(payload: Password): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/add`, payload)
      .pipe(tap(() => this.fetchAllPasswords()));
  }

  deletePassword(passwordId: string): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}/delete/${passwordId}`)
      .pipe(tap(() => this.fetchAllPasswords()));
  }

  fetchAllPasswords(): void {
    this.http.get<PasswordRes[]>(`${this.apiUrl}/fetch`).subscribe({
      next: (passwords: PasswordRes[]) => this.passwordsSubject.next(passwords),
      error: (error:Error) => console.error('Failed to fetch passwords', error),
    });
  }
}
