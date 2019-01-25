import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProduitsListeComponent } from './produits-liste/produits-liste.component';
import { ProduitsService } from './services/produits.service';
import { AuthentificationService } from './services/authentification.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router'
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';


/*****ROUTES PERMETTANT DE PASSER D'UN COMPONENT A L'AUTRE*****/
const appRoutes: Routes = [
  { path: 'auth/signup', component: SignUpComponent },
  { path: 'auth/signin', component: SignInComponent },
  { path: 'produits', component: ProduitsListeComponent },
  { path: '', redirectTo: 'produits', pathMatch: 'full' },
  { path: '**', redirectTo: 'produits' }
];

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    HeaderComponent,
    ProduitsListeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    ProduitsService,
    AuthentificationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }