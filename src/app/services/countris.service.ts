import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Collaborator } from '../interfaces/collaborator.interface';
import { Observable } from 'rxjs';
import { Countries } from '../interfaces/countries.interface';

@Injectable({
  providedIn: 'root'
})
export class CountrisService {


  baseUrl = 'http://127.0.0.1:8000/api/paises';

  private http = inject(HttpClient);
  private router = inject(Router);

  constructor() { }

  getCountries(): Observable<Countries[]> { 
    return this.http.get<Countries[]>(`${this.baseUrl}`);
  }

  updateCountry(id: number, data: Partial<Countries>): Observable<Countries> {
    return this.http.put<Countries>(`${this.baseUrl}/${id}`, data);
  }

  deleteCountry(id: number): Observable<Countries> {
    return this.http.delete<Countries>(`${this.baseUrl}/${id}`);
  }
  


}
