import { Injectable } from  '@angular/core';
import { Actions, Effect, ofType } from  '@ngrx/effects';
import { Observable } from  'rxjs/Observable';
import { catchError, map, switchMap } from  'rxjs/operators';
import {of} from "rxjs/index";
import {ProduitService} from "../../produit/produit.service";
import {ProduitListModule} from "../actions/produit.action";

@Injectable()
export  class  ProduitListEffects {
  // Ecoute les actions passées dans le store
  @Effect() LoadProduit$: Observable<ProduitListModule.Actions> = this.actions$
    .pipe(
      ofType(ProduitListModule.ActionTypes.LOAD_INIT_PRODUITS),
      switchMap(action  =>  this.produitListService.getProduit()),
      map(produits => new ProduitListModule.SuccessInitProduits(produits)),
      catchError((err) => of(new ProduitListModule.ErrorLoadAction(err)))
    );

  @Effect() LoadCreateProduit$: Observable<ProduitListModule.Actions> = this.actions$
    .pipe(
      ofType<ProduitListModule.LoadCreateProduit>(ProduitListModule.ActionTypes.LOAD_CREATE_PRODUIT),
      switchMap(action => this.produitListService.createProduit(action.payload)),
      map(produit => new ProduitListModule.SuccessCreateProduit(produit)),
      catchError((err) => of(new ProduitListModule.ErrorLoadAction(err)))
    );

  @Effect() LoadDeleteProduit$: Observable<ProduitListModule.Actions> = this.actions$
    .pipe(
      ofType<ProduitListModule.LoadDeleteProduit>(ProduitListModule.ActionTypes.LOAD_DELETE_PRODUIT),
      switchMap(action => this.produitListService.deleteProduit(action.payload)),
      map(id => new ProduitListModule.SuccessDeleteProduit(id)),
      catchError((err) => of(new ProduitListModule.ErrorLoadAction(err)))
    );

  constructor(
    private  produitListService: ProduitService,
    private  actions$: Actions,
  ) {}

}
