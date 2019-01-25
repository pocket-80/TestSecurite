import { Component, OnInit, OnDestroy } from '@angular/core';
import { Produit } from '../models/produits';
import { Subscription } from 'rxjs';
import { ProduitsService } from '../services/produits.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { Utilisateur } from '../models/utilisateur';
import { UtilisateursService } from '../services/utilisateurs.service';
import DataSnapshot = firebase.database.DataSnapshot;
import { Panier } from '../models/panier';
import { isUndefined } from 'util';

@Component({
  selector: 'app-produits-liste',
  templateUrl: './produits-liste.component.html',
  styleUrls: ['./produits-liste.component.css']
})

export class ProduitsListeComponent implements OnInit, OnDestroy {

  produitForm: FormGroup;
  produits: Produit[];
  produitSubscription: Subscription;
  utilisateurSubscription: Subscription;
  popUpAjouterProduit: boolean;
  admin: boolean;
  user: boolean;
  utilisateurCurrent: Utilisateur;
  utilisateurs: Utilisateur[];
  emailAChercher: string;
  firstTime: boolean = true;

  constructor(private produitsService: ProduitsService, private utilisateurService: UtilisateursService,
    private router: Router,
    private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.initForm();
    //RECUPERATION DES UTILISATEURS DEPUIS DANS LA BASE DE DONNEES
    this.utilisateurSubscription = this.utilisateurService.utilisateurSubject.subscribe(
      (utilisateurs: Utilisateur[]) => {
        this.utilisateurs = utilisateurs;
        this.findUserInBdd();
      });
    //RECUPERATION DES PRODUITS DEPUIS DANS LA BASE DE DONNEES
    this.produitSubscription = this.produitsService.produitSubject.subscribe(
      (produits: Produit[]) => {
        this.produits = produits;
      });
  }

  /*****FONCTION POUR SUPPRIMER LES PRODUITS DE LA BASE DE DONNEES*****/
  onDeleteProduit(p: Produit) {
    this.produitsService.removeProduit(p);
    // VERIFICATION QUE LE PRODUIT N'APPARTENAIT PAS AU PANIER D'UN UTILISATEUR
    this.utilisateurs.forEach(u => {
      u.Panier.Liste.forEach(pr => {
        if (pr.Nom == p.Nom) {
          this.supprimerProduitDuPanier(pr);
        }
      });
    })
  }

  /*****FONCTION APPLIQUEE LORSQUE L'ON QUITTE CETTE PAGE*****/
  ngOnDestroy() {
    console.log("Destruction :::: \n");
    this.produitSubscription.unsubscribe();
    this.utilisateurSubscription.unsubscribe();
    console.log("Destruction FINIE :::: \n");
  }

  /*****FONCTION PERMETTANT D'OUVRIR LA POPUP DE CREATION DE PRODUIT*****/
  ajouterProduit() {
    this.popUpAjouterProduit = true;
    this.initForm();
  }

  /*****FONCTION PERMETTANT DE QUITTER LA POPUP D'AJOUT PRODUIT*****/
  annuleAjoutProduit() {
    this.popUpAjouterProduit = false;
    this.initForm();
  }
  // INITIALISATION DU FORMULAIRE D'AJOUT DE PRODUITS
  initForm() {
    this.produitForm = this.formBuilder.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      prix: ['', Validators.required],
      quantite: ['', Validators.required],
    });
  }

  /*****FONCTION PERMETTANT D'AJOUTER DES PRODUITS*****/
  onSaveProduit() {
    // RECUPERATION DES DONNEES DU FORMULAIRE
    const nom = this.produitForm.get('nom').value;
    const description = this.produitForm.get('description').value;
    const prix = this.produitForm.get('prix').value;
    const quantite = this.produitForm.get('quantite').value;
    const newProduit = new Produit();
    newProduit.Nom = nom;
    newProduit.Description = description;
    newProduit.Prix = prix;
    newProduit.Quantite = quantite;
    // APPEL DU SERVICE PRODUIT POUR CREER UN PRODUIT
    this.produitsService.createNewProduit(newProduit);
    this.initForm();
    this.popUpAjouterProduit = false;
    this.router.navigate(['/produits']);
  }

  /*****FONCTION PERMETTANT DE SAVOIR SI L'UTILISATEUR EST ADMIN OU NON*****/
  findUserInBdd() {
    this.emailAChercher = this.recupEmail();
    this.utilisateurs.forEach(u => {
      if (u.Mail == this.emailAChercher) {
        this.utilisateurCurrent = new Utilisateur();
        this.utilisateurCurrent = u;
        if (this.utilisateurCurrent.IsAdmin) {
          console.log("VOUS ETES ADMIN \n");
          this.admin = true;
        }
        else {
          console.log("VOUS ETES UN UTILISATEUR NORMAL \n");
          this.admin = false;
        }
      }
    })
  }

  /*****FONCTION RECUPERANT L'EMAIL DE L'UTILISATEUR CONNECTE*****/
  // LA VARIABLE "USER" PERMET DE SAVOIR SI UN UTILISATEUR EST CONNECTE
  recupEmail(): string {
    let user = firebase.auth().currentUser;
    if (user != null) {
      // User is signed in
      this.user = true;
      return user.email;
    } else {
      // No user is signed in
      console.log("Aucun utilisateur connecté :: \n");
      this.user = false;
      return "";
    }
  }

  /*****FONCTION PERMETTANT D'AJOUTER UN PRODUIT AU PANIER DE L'UTILISATEUR CONNECTE*****/
  addToBasket(p: Produit) {
    // IF PERMETTANT D'EVITER DE CONTINUER A AJOUTER DES PRODUITS 
    // DANS LE PANIER SI LA QUANTITE EST NULLE
    if (p.Quantite <= 0) {
      return 0;
    }
    // PERMET DE DETECTER SI LE PANIER A ETE VIDE PRECEDEMMENT ET DONC DE 
    // RE INITIALISER LA VARIABLE PANIER
    if (isUndefined(this.utilisateurCurrent.Panier.Liste)) {
      // console.log("Le panier a été vidé précédemment");
      this.utilisateurCurrent.Panier = new Panier();
      this.utilisateurCurrent.Panier.Liste = new Array<Produit>();
      this.utilisateurCurrent.Panier.PrixTotal = 0;
    }

    let index = this.utilisateurs.indexOf(this.utilisateurCurrent);
    let produit = new Produit();
    produit.Description = p.Description;
    produit.Nom = p.Nom;
    produit.Prix = p.Prix;
    console.log(this.utilisateurCurrent.Panier);
    let trouve = false;
    // SI LE PRODUIT EST DEJA DANS LE PANIER ON AUGMENTE JUSTE LA QUANTITE
    this.utilisateurCurrent.Panier.Liste.forEach(pr => {
      if (p.Nom == pr.Nom) {
        // console.log("Le produit est déjà dans le panier \n");
        trouve = true;
        pr.Quantite += 1;
      }
    })
    // SI LE PRODUIT N'EST PAS DANS LE PANIER ON L'AJOUTE
    if (!trouve) {
      produit.Quantite = 1;
      this.utilisateurCurrent.Panier.Liste.push(produit);
    }

    //MAJ DU PRIX DU PANIER
    // ENREGISTREMENT DES MODIFICATIONS EN BDD
    this.utilisateurCurrent.Panier.PrixTotal += produit.Prix;
    this.utilisateurs[index] = this.utilisateurCurrent;
    firebase.database().ref('/utilisateurs').set(this.utilisateurs);
    p.Quantite--;
    firebase.database().ref('/produits').set(this.produits);
  }

  /*****FONCTION PERMETTANT DE SUPPRIMER UN PRODUIT DU PANIER*****/
  supprimerProduitDuPanier(p: Produit) {
    // console.log("Fonction supprimer produit du panier");
    const indexUser = this.utilisateurs.indexOf(this.utilisateurCurrent);
    const indexProduit = this.utilisateurCurrent.Panier.Liste.indexOf(p);

    // SI C'EST LE DERNIER ARTICLE DU PANIER ON UTILISE LA FONCTION VIDERPANIER()
    if (this.utilisateurCurrent.Panier.Liste.length <= 1) {
      // console.log("Panier va etre vidé vide on le réinitialise \n");
      this.viderPanier();
    }
    else {
      if (p != null) {
        // IL FAUT REMETTRE A JOUR LA QUANTITE DU PRODUIT
        // POUR CELA ON RAJOUTE LA QUANTITE DE CHAQUE PRODUIT QUI ETE DANS LE PANIER
        this.produits.forEach(pr => {
          if (p.Nom == pr.Nom) {
            // console.log("Le produit est déjà dans le panier \n");
            // console.log("Quantite produit en stock: "+pr.Quantite );
            // console.log("Quantite produit dans panier: "+p.Quantite );
            pr.Quantite += p.Quantite;
          }
        })
        this.utilisateurCurrent.Panier.Liste.splice(indexProduit, 1);
        this.utilisateurCurrent.Panier.PrixTotal -= p.Quantite * p.Prix;
        this.utilisateurs[indexUser] = this.utilisateurCurrent;
      }
    }
    // SAUVEGARDE DES MODIFICATIONS DANS LA BDD
    firebase.database().ref('/utilisateurs').set(this.utilisateurs);
    firebase.database().ref('/produits').set(this.produits);
  }

  /*****FONCTION PERMETTANT DE VIDER L'INTEGRALITE DU PANIER*****/
  viderPanier() {
    this.utilisateurCurrent.Panier.Liste.forEach(p => {
      this.produits.forEach(prInBdd => {
        // ON RECUPERE LE PRODUIT DE LA BDD CORRESPOND AU PRODUIT DANS LA BDD
        if (prInBdd.Nom == p.Nom) {
          // ON DECROIT LE PRIX DU PANIER A CHAQUE ITERATION 
          //ET ON REMET LA QUANTITE CORRESPONDANTE DU PRODUIT CHOISI DANS LA QUANTITE EN BDD
          this.utilisateurCurrent.Panier.PrixTotal -= p.Quantite * prInBdd.Prix;
          prInBdd.Quantite += p.Quantite;
        }
      })
    })
    this.utilisateurCurrent.Panier = new Panier();
    this.utilisateurCurrent.Panier.Liste = new Array<Produit>();
    this.utilisateurCurrent.Panier.PrixTotal = 0;
    // SAUVEGARDE DES MODIFICATIONS
    firebase.database().ref('/utilisateurs').set(this.utilisateurs);
    firebase.database().ref('/produits').set(this.produits);
  }
}
