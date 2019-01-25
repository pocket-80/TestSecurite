import { Injectable } from '@angular/core';
import { Utilisateur } from '../models/utilisateur';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;
import { Produit } from '../models/produits';

@Injectable({
  providedIn: 'root'
})
export class UtilisateursService {
  utilisateurs: Utilisateur[];
  utilisateurSubject = new Subject<Utilisateur[]>();

  constructor() {
    this.getUtilisateurs();
  }

  emitUtilisateurs() {
    this.utilisateurSubject.next(this.utilisateurs);
  }

  /*****FONCTION PERMETTANT DE SAUVEGARDER LES UTILISATEURS DANS LA BDD*****/
  saveUtilisateurs() {
    firebase.database().ref('/utilisateurs').set(this.utilisateurs);
  }

  /*****FONCTION PERMETTANT DE RECUPERER LES UTILISATEURS DE LA BDD*****/
  getUtilisateurs() {
    firebase.database().ref('/utilisateurs')
      .on('value', (data: DataSnapshot) => {
        this.utilisateurs = data.val() ? data.val() : [];
        this.emitUtilisateurs();
      }
      );
  }

  /*****FONCTION PERMETTANT DE CREER LES UTILISATEURS DANS LA BDD*****/
  createNewUtilisateur(u: Utilisateur) {
    console.log("test:: " + u);
    this.utilisateurs.push(u);
    this.saveUtilisateurs();
    this.emitUtilisateurs();
  }
}
