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

  // En company.service.ts
  updateCompany(id: number, data: Partial<Company>): Observable<Company> {
    return this.http.put<Company>(`${this.baseUrl}/${id}`, data);
  }
  
  deleteCompany(id: number): Observable<Company> {
    return this.http.delete<Company>(`${this.baseUrl}/${id}`);
  }
  
  createCompany(data: Partial<Company>): Observable<Company> {
    return this.http.post<Company>(this.baseUrl, data);
  }
  

  
}
