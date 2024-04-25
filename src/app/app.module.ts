import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';


import { CaptionComponent } from './component/caption/caption.component';
import { SignupComponent } from './pages/signup/signup.component';
import { NotFoundComponent } from './component/not-found/not-found.component';



@NgModule({
  declarations: [
    AppComponent,HeaderComponent, CaptionComponent, SignupComponent, NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
