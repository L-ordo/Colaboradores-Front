import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Collaborator } from '../interfaces/collaborator.interface';
import { Observable } from 'rxjs';
import { Company } from '../interfaces/company.interface';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  baseUrl = 'http://127.0.0.1:8000/api/empresas';

  private http = inject(HttpClient);
  private router = inject(Router);
  constructor() { }

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(`${this.baseUrl}`);
  }
  
}
