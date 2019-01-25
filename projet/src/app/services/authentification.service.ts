import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private router: Router) { }
  /*****FONCTION PERMETTANT LA CREATION DE NOUVEL UTILISATEUR FIREBASE*****/
  createNewUser(email: string, password: string) {
      return new Promise(
        (resolve, reject) => {
          firebase.auth().createUserWithEmailAndPassword(email, password).then(
            () => {
              this.router.navigate(['/produits']);
              resolve();
            },
            (error) => {
              reject(error);
            }
          );
        }
      );
    }
  
  /*****FONCTION PERMETTANT A UN UTILISATEUR FIREBASE DE SE CONNECTER*****/
  signInUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            this.router.navigate(['/produits']);
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }
  /*****FONCTION PERMETTANT A UN UTILISATEUR FIREBASE CONNECTE DE SE DECONNECTER*****/
  signOutUser() {
    firebase.auth().signOut().then(
      () => {
        this.router.navigate(['/produits']);
      },
      (error) => {
      }
    );
  }
}
