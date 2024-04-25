import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private theme: string = 'light';

  constructor() {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      this.theme = storedTheme;
    }
    this.setTheme(this.theme);
  }

  getTheme() {
    return this.theme;
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', this.theme);
    this.setTheme(this.theme);
    return this.theme;
  }

  private setTheme(theme: string) {
   let themeLink = document.getElementsByName('data-theme')[0] as HTMLElement;

   if (themeLink) {
     themeLink.setAttribute('data-theme', theme); // Assuming `theme` is the value you want to set
   }
  }
}
