import { Component, OnInit } from '@angular/core';
import { Produits } from 'src/app/Classes/Produits';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liste-produits',
  templateUrl: './liste-produits.component.html',
  styleUrls: ['./liste-produits.component.css']
})
export class ListeProduitsComponent implements OnInit {
  
  listeProduit: Array<Produits> = new Array<Produits>(); 
  produitHtml : Produits;
  produitTemp : Produits = new Produits(0, "Pomme","Golden",10, 1, true);
  produitTemp2 : Produits = new Produits(1, "Tomates","Rondes",20, 1.50, true);
  produitTemp3 : Produits = new Produits(2, "Poires","",20, 1.50, true);
  produitTemp4 : Produits = new Produits(3, "Concombres","Espagne",20, 1.50, true);
  produitTemp5 : Produits = new Produits(4, "Lait","Demi-ecreme",20, 1.50, true);
  produitTemp6 : Produits = new Produits(5, "Betteraves","Maroc",20, 1.50, true);
  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.listeProduit.push(this.produitTemp);
    this.listeProduit.push(this.produitTemp2);
    this.listeProduit.push(this.produitTemp3);
    this.listeProduit.push(this.produitTemp4);
    this.listeProduit.push(this.produitTemp5);
    this.listeProduit.push(this.produitTemp6);

    console.log("Premier produit:" + this.produitTemp.Nom);
    console.log("Deuxième produit:" + this.produitTemp2.Nom);

    console.log("Liste produits: \n");
    console.log(this.listeProduit);

    this.apiService.getProduit().subscribe( res => {
      if(res.ok){
        this.listeProduit = res.body;
      }
    }
    , res => {
      console.log("Une erreur s'est produit lors de la récupération des produits ! ");
    });

    console.log("Liste produits: \n");
    console.log(this.listeProduit);

  }

  postProduit(nom:string, description:string, quantite:number, prix:number
    , dispo: boolean)
  {
    let id = this.listeProduit.length;
    console.log("id: " + id);
    console.log("nom: " + nom);
    console.log("description: " + description);
    console.log("quantite: " + quantite);
    console.log("prix: " + prix);
    console.log("dispo: " + dispo);
    // this.produitHtml = new Produits(id, nom, description, quantite, prix, dispo);
    // this.apiService.postProduit(this.produitHtml);
    // this.listeProduit.push(this.produitHtml);
  }
}
