import {Component, Inject, OnInit} from '@angular/core';
import {Produit} from "../produit/produit.interface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppState} from "../store/index";
import {Store} from "@ngrx/store";
import {ProduitListModule} from "../store/actions/produit.action";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ajout-produit',
  templateUrl: './ajout-produit.component.html',
  styleUrls: ['./ajout-produit.component.css']
})
export class AjoutProduitComponent implements OnInit {

  public produitForm: FormGroup;

  constructor(private router: Router, @Inject(FormBuilder) fb: FormBuilder, private store: Store<AppState>) {
    this.produitForm = fb.group({
      libelle: ['', Validators.required],
      coefficient: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  createMatiere(data: Produit) {
    const payload = {
      ...data
    };
    this.store.dispatch(new ProduitListModule.LoadCreateProduit(payload));
    // this.matiereForm.reset();
    this.router.navigateByUrl('/produit');
  }

}