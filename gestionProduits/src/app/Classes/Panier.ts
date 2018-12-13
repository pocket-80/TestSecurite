import { Produits } from './Produits';

export class Panier {
    Id: number;
    Nom: string;
    ListeProduits: Array<Produits>;
    Prix: number;
}