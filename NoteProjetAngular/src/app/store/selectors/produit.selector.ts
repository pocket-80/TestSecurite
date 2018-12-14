import * as fromProduits from '../reducers/produit.reducer';
import {AppState} from "../index";
import {createSelector} from "@ngrx/store";
export { selectProduitsIds, selectProduitsEntities, selectProduits, selectTotalProduits } from '../reducers/produit.reducer';

// La première fonction amène vers le state matieres
export const selectProduitListState$ = (state: AppState) =>  state.produits;

// Et à partir de celle-ci, on créer une autre fonction qui renverra data
/*export const selectMatieres$ = createSelector(selectMatiereListState$,(matieres) =>  matieres.data);*/

export const selectProduitListEntitiesConverted$ = createSelector(
  selectProduitListState$,
  fromProduits.selectProduits);

export  const  selectProduitsLoading$ =
  createSelector(selectProduitListState$, (produits) =>  produits.loading);

export  const  selectProduitsLoaded$ =
  createSelector(selectProduitListState$, (produits) =>  produits.loaded);

export const selectProduitsErrors$ =
  createSelector(selectProduitListState$, (produits) => produits.logs);
