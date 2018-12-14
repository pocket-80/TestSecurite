import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs/Rx";
import {Matiere} from "./matiere.interface";
import {map} from "rxjs/internal/operators";

@Injectable()
export class MatiereService {
  constructor(private http: HttpClient) { }

  getMatiere(): Observable<Matiere[]> {
    return  this.http.get<Matiere[]>(`${environment.apiUrl}/matieres`);
  }

  createMatiere(body): Observable<Matiere> {
    return this.http.post<Matiere>(`${environment.apiUrl}/matieres`, body);
  }

  deleteMatiere(id): Observable<number> {
    return this.http.post<Matiere>(`${environment.apiUrl}/matieres/delete`, {'id': id})
      .pipe(map(response => id));
  }
}
