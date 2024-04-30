import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';


import { SignupComponent } from './pages/signup/signup.component';
import { NotFoundComponent } from './component/not-found/not-found.component';

import { AuthCardComponent } from './component/auth-card/auth-card.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PasswordGeneratorComponent } from './component/password-generator/password-generator.component';


import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    NotFoundComponent,
    AuthCardComponent,
    HomePageComponent,
    PasswordGeneratorComponent,
  ],
  imports: [BrowserModule, AppRoutingModule ,FormsModule,HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
