import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { Router } from '@angular/router';
import { Produits } from './Classes/Produits';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private router: Router) { 
  }
  private url = "http://localhost:";


  getProduit() : Observable<HttpResponse<any>> {
    return this.http.get<any>(this.url); 
  }

  // postProduit(monProd: Produits) {
  //   return this.http.post(this.url, monProd); 
  // }
}
