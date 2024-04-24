import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  checked!: boolean;
  selectedTheme!: string;
  themeService: ThemeService = inject(ThemeService);

  ngOnInit() {
    this.selectedTheme = this.themeService.getTheme();
    this.checked = this.selectedTheme === 'dark' ? true : false;
  }

  onToggleTheme() {
    this.selectedTheme = this.themeService.toggleTheme();
  }
}
