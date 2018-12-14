import { HttpErrorResponse } from '@angular/common/http';
import {Produit} from "../../produit/produit.interface";

export namespace ProduitListModule {

  export enum ActionTypes {
    LOAD_INIT_PRODUITS = '[produitList] Load Init Produits',
    SUCCESS_INIT_PRODUITS = '[produitList] Success Init Produits',
    LOAD_DELETE_PRODUIT = '[todoList] Load Delete Produit',
    SUCCESS_DELETE_PRODUIT = '[todoList] Success Delete Produit',
    LOAD_CREATE_PRODUIT = '[produitList] Load Create Produit',
    SUCCESS_CREATE_PRODUIT = '[produitList] Success Create Produit',
    ERROR_LOAD_ACTION = '[produitList] Error Load Action'
  }

  export  class  LoadInitProduits {
    readonly  type = ActionTypes.LOAD_INIT_PRODUITS;
  }

  export  class  SuccessInitProduits {
    readonly  type = ActionTypes.SUCCESS_INIT_PRODUITS;
    constructor( public payload: Produit[]) {}
  }

  export class LoadDeleteProduit {
    readonly type = ActionTypes.LOAD_DELETE_PRODUIT;
    constructor(public payload: number) {}
  }

  export class SuccessDeleteProduit {
    readonly type = ActionTypes.SUCCESS_DELETE_PRODUIT;
    constructor(public payload: number) {}
  }

  export class LoadCreateProduit {
    readonly type = ActionTypes.LOAD_CREATE_PRODUIT;
    constructor(public payload: Produit) {}
  }

  export class SuccessCreateProduit {
    readonly type = ActionTypes.SUCCESS_CREATE_PRODUIT;
    constructor(public payload: Produit) {}
  }

  export class ErrorLoadAction {
    readonly type = ActionTypes.ERROR_LOAD_ACTION;
    constructor(public payload: HttpErrorResponse) {}
  }

  export type Actions = LoadInitProduits | ErrorLoadAction | SuccessInitProduits | LoadCreateProduit
    | SuccessCreateProduit |  LoadDeleteProduit
    | SuccessDeleteProduit;
}
