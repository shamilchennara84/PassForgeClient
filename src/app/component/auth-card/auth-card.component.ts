import {
  Component,
  inject,
  NgZone,
  OnInit,

} from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';

declare var google: any;

@Component({
  selector: 'app-auth-card',
  templateUrl: './auth-card.component.html',
  styleUrls: ['./auth-card.component.scss'],
})
export class AuthCardComponent implements OnInit {
  private router = inject(Router);
  private ngZone = inject(NgZone);
  isLoading = true;

  clientId!: string;
  ngOnInit(): void {
    this.clientId = environment.googleclientId;
    google.accounts.id.initialize({
      client_id: this.clientId,
      callback: (resp: any) => {
        this.loginHandler(resp);
      },
    });
    google.accounts.id.renderButton(document.getElementById('google-btn'), {
      size: 'large',
      shape: 'rectangular',
      width: 240,
      height: 50,
    });
     setTimeout(() => {
       this.isLoading = false; // Hide loader
     }, 100);
  }

  decodeToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  loginHandler(response: any) {
    if (response) {
      console.log(response);
      const payload = this.decodeToken(response.credential);
      sessionStorage.setItem('loggedUser', JSON.stringify(payload));
      this.ngZone.run(() => {
        this.router.navigate(['home']);
      });
    }
  }
}
