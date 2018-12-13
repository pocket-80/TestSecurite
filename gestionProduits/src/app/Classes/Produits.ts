
export class Produits {
    Id: number;
    Nom: string;
    Description: string;
    QuantiteStocke: number;
    Prix: number;
    DispoVente: boolean;
    Image: string;

    constructor(id:number, nom:string, description:string, quantite:number, prix:number
        , dispo: boolean)
    {
        this.Id = id; 
        this.Nom = nom; 
        this.Description = description; 
        this.QuantiteStocke = quantite; 
        this.Prix = prix; 
        this.DispoVente = dispo; 
        return this;
    }
}