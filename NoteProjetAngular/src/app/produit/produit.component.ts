import { Component, OnInit } from '@angular/core';
import {Produit} from './produit.interface';
import {Router} from "@angular/router";
import {Observable} from "rxjs/Rx";
import {AppState} from "../store/index";
import {select, Store} from "@ngrx/store";
import {ProduitListModule} from "../store/actions/produit.action";
import {selectProduitListEntitiesConverted$, selectProduitsLoading$} from "../store/selectors/produit.selector";
import {ProduitService} from './produit.service.ts';


@Component({
  selector: 'app-produits',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitsComponent implements OnInit {

  public produits$: Observable<Produit[]>;
  public  produitsLoading: Observable<boolean>;

  constructor(private router: Router, private store: Store<AppState>, private produitListService : ProduitService) {
    this.produits$ = store
      .pipe(select(selectProduitListEntitiesConverted$));
    this.produitsLoading = store.pipe(select(selectProduitsLoading$));
  }

  ngOnInit() {
    this.store.dispatch(new  ProduitListModule.LoadInitProduits());
  }

  goToAddProduit () {
    this.router.navigateByUrl('/ajout-produit');
  }

  deleteProduit(id: number) {
    this.store.dispatch(new ProduitListModule.LoadDeleteProduit(id));
  }

}
