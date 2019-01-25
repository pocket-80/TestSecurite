import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular';
  constructor() {
    /*****INITIALISATION DU LIEN ENTRE ANGULAR ET FIREBASE*****/
    var config = {
      apiKey: "AIzaSyDd8obAoowOpkqViaH-p6GPoVVWHtZ63XM",
      authDomain: "tptest-802b8.firebaseapp.com",
      databaseURL: "https://tptest-802b8.firebaseio.com",
      projectId: "tptest-802b8",
      storageBucket: "tptest-802b8.appspot.com",
      messagingSenderId: "839667013925"
    };
    firebase.initializeApp(config);
  }
}



