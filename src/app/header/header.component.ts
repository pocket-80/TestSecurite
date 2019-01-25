import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuth: boolean;
  constructor(private authService : AuthentificationService) { }


  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if(user) {
          this.isAuth = true;
        } else {
          this.isAuth = false;
        }
      }
    );
    
  }

  onSignOut() {
    this.authService.signOutUser();
    location.reload();
  }

}
