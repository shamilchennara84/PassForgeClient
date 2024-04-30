import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  checked!: boolean;
  selectedTheme!: string;
  themeService: ThemeService = inject(ThemeService);
  auth = inject(AuthService);
  pic = JSON.parse(sessionStorage.getItem('loggedUser')!).picture;

  ngOnInit() {
    this.selectedTheme = this.themeService.getTheme();
    this.checked = this.selectedTheme === 'dark' ? true : false;
  }

  onToggleTheme() {
    this.selectedTheme = this.themeService.toggleTheme();
  }

  signout() {
    sessionStorage.removeItem('loggedUser');
    this.auth.signOut();
  }
}
