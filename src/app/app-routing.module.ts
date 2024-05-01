import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { passwordResolver } from './services/password-resolver.service';
import { authGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/signup',
    pathMatch: 'full',
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'home',
    component: HomePageComponent,
    canActivate:[authGuard],
    resolve: { passwords: passwordResolver },
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
