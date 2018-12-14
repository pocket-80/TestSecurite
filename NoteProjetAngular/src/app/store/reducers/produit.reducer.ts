import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import {Produit} from "../../produit/produit.interface";
import {ProduitListModule} from "../actions/produit.action";

export interface ProduitListStateEntity extends EntityState<Produit> {
  loading: boolean;
  loaded: boolean;
  selectProduit: Produit;
  logs: {
    type: string;
    message: string;
  };
}

export const ProduitListAdapter: EntityAdapter<Produit> = createEntityAdapter<Produit>({
  sortComparer: false
});

export const initialState: ProduitListStateEntity = ProduitListAdapter.getInitialState({
  loading: false,
  loaded: false,
  selectProduit: undefined,
  logs: undefined
});

export const {
  selectIds: selectProduitsIds,
  selectEntities: selectProduitsEntities,
  selectAll: selectProduits,
  selectTotal: selectTotalProduits
} = ProduitListAdapter.getSelectors();

export function produitsReducer(
  state = initialState,
  action: ProduitListModule.Actions
): ProduitListStateEntity {

  switch (action.type) {

    case ProduitListModule.ActionTypes.LOAD_INIT_PRODUITS:
      // Passe le loading a true
      return {
        ...state,
        loading: true
      };

    case ProduitListModule.ActionTypes.SUCCESS_INIT_PRODUITS:
      return {
        ...ProduitListAdapter.addMany(action.payload, state),
        loading: false,
        loaded: true,
      };

    case ProduitListModule.ActionTypes.LOAD_DELETE_PRODUIT:
      return {
        ...state,
        loading: true
      };

    case ProduitListModule.ActionTypes.SUCCESS_DELETE_PRODUIT:
      return {
        ...ProduitListAdapter.removeOne(action.payload, state),
        logs: { type: 'SUCCESS', message: 'Le Produit a été supprimé avec succès' }
      };

    case ProduitListModule.ActionTypes.LOAD_CREATE_PRODUIT:
      // Passe le loading a true
      return {
        ...state,
        loading: true
      };

    case ProduitListModule.ActionTypes.SUCCESS_CREATE_PRODUIT:
      // Passe le loading a false et ajoute une matiere
      return {
        ...ProduitListAdapter.addOne(action.payload, state),
        loading: false,
        logs: { type: 'SUCCESS', message: 'Le produit a été créée avec succès' },
      };

    case ProduitListModule.ActionTypes.ERROR_LOAD_ACTION:
      return {
        ...state,
        logs: { type: 'ERROR', message: action.payload.message },
        loading: false
      };

    default:
      return state;
  }
}

