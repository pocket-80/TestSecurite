import { ActionReducerMap } from '@ngrx/store';
import { InjectionToken } from '@angular/core';
import {ProduitListEffects} from "./effects/produit.effect";
import {ProduitListStateEntity, produitsReducer} from "./reducers/produit.reducer";

// Le root reducer
const reducers = {
  produits: produitsReducer
};

export interface AppState {
  produits: ProduitListStateEntity;
}

// Nécéssaire pour l'AOT
export function getReducers() {
  return reducers;
}
// Nécéssaire pour l'AOT
export const REDUCER_TOKEN = new InjectionToken<ActionReducerMap<AppState>>('Registered Reducers');

export  const  appEffects = [ProduitListEffects];
