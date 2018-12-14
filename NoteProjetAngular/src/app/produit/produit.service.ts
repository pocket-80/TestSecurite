import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs/Rx";
import {Produit} from "./produit.interface";
import {map} from "rxjs/internal/operators";

@Injectable()
export class ProduitService {
  constructor(private http: HttpClient) { }

  getProduit(): Observable<Produit[]> {
    return  this.http.get<Produit[]>(`${environment.apiUrl}/produits`);
  }

  createProduit(body): Observable<Produit> {
    return this.http.post<Produit>(`${environment.apiUrl}/produits`, body);
  }

  deleteProduit(id): Observable<number> {
    return this.http.post<Produit>(`${environment.apiUrl}/produits/delete`, {'id': id})
      .pipe(map(response => id));
  }
}
