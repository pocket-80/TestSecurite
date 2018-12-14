import { Component, OnInit } from '@angular/core';
import {ProduitListModule} from "../store/actions/produit.action";
import {Observable} from "rxjs/Rx";
import {Produit} from "../produit/produit.interface";
import {select, Store} from "@ngrx/store";
import {AppState} from "../store/index";
import {selectProduitListEntitiesConverted$, selectProduitsLoading$} from "../store/selectors/produit.selector";

@Component({
  selector: 'app-produits-clone',
  templateUrl: './produits-clone.component.html',
  styleUrls: ['./produits-clone.component.css']
})
export class ProduitsCloneComponent implements OnInit {

  public produits$: Observable<Produit[]>;
  public  produitsLoading: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.produits$ = store
      .pipe(select(selectProduitListEntitiesConverted$));

    this.produitsLoading = store.pipe(select(selectProduitsLoading$));
  }

  ngOnInit() {
    this.store.dispatch(new  ProduitListModule.LoadInitProduits());
  }

  deleteProduit(id: number) {
    this.store.dispatch(new ProduitListModule.LoadDeleteProduit(id));
  }

}
