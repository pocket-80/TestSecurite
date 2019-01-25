import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthentificationService } from '../services/authentification.service';
import { Router } from '@angular/router';
import { UtilisateursService } from '../services/utilisateurs.service';
import { Utilisateur } from '../models/utilisateur';
import { Panier } from '../models/panier';
import { Produit } from '../models/produits';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {

  signupForm: FormGroup;
  errorMessage: string;
  u: Utilisateur;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthentificationService,
    private utilisateurService: UtilisateursService,
    private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  /*****FONCTION D'INITIALISER LE FORMULAIRE DE CREATION DE COMPTE*****/
  initForm() {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      nom: ['', [Validators.required, Validators.required]],
      prenom: ['', [Validators.required, Validators.required]],
    });
  }

  /*****FONCTION EXECUTEE A LA VALIDATION DU FORMULAIRE DE CREATION*****/
  onSubmit() {
    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('password').value;
    const prenom = this.signupForm.get('prenom').value;
    const nom = this.signupForm.get('nom').value;

    this.authService.createNewUser(email, password).then(
      () => {
        this.u = new Utilisateur();
        this.u.Nom = nom;
        this.u.Mail = email;
        this.u.Prenom = prenom;
        this.u.IsAdmin = false;
        this.u.Panier = new Panier();
        this.u.Panier.Liste = new Array<Produit>();
        this.u.Panier.PrixTotal = 0;
        this.utilisateurService.createNewUtilisateur(this.u);
        this.router.navigate(['/produits']);
        location.reload();
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }
}
