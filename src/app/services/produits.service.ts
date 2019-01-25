import { Injectable } from '@angular/core';
import { Produit } from '../models/produits';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {
  produits: Produit[];
  produitSubject = new Subject<Produit[]>();

  constructor() {
    this.getProduits();
   }
  emitProduits(){
    this.produitSubject.next(this.produits);
  }

  /*****FONCTION PERMETTANT DE SAUVEGARDER LES PRODUITS DANS LA BDD*****/
  saveProduits() {
    firebase.database().ref('/produits').set(this.produits);
  }

  /*****FONCTION PERMETTANT DE L'INTEGRALITE DES PRODUITS DE LA BDD*****/
  getProduits() {
    firebase.database().ref('/produits')
    .on('value', (data: DataSnapshot) => {
        this.produits = data.val() ? data.val() : [];
        this.emitProduits();
      }
    );
  }

  /*****FONCTION PERMETTANT DE CREER UN NOUVEAU PRODUIT ET DE L'AJOUTER EN BDD *****/
  createNewProduit(p: Produit){
    console.log("test:: " +p.Nom);
    this.produits.push(p);
    this.saveProduits();
    this.emitProduits();
  }

  /*****FONCTION PERMETTANT DE SUPPRIMER UN PRODUIT DE LA BDD*****/
  removeProduit(p: Produit) {
    const produitIndexToRemove = this.produits.findIndex(
      (produitEl) => {
        if(produitEl === p) {
          return true;
        }
      }
    );
    this.produits.splice(produitIndexToRemove, 1);
    this.saveProduits();
    this.emitProduits();
  }
}
