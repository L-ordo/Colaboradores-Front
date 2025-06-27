import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from '../interfaces/departamento.interface';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private http = inject(HttpClient);
  baseUrl = 'http://127.0.0.1:8000/api/departamentos';

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.baseUrl);
  }

  updateDepartment(id: number, data: Partial<Department>): Observable<Department> {
    return this.http.put<Department>(`${this.baseUrl}/${id}`, data);
  }

  deleteDepartment(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  createDepartment(data: { nombre: string, pais_id: number }): Observable<Department> {
    return this.http.post<Department>(this.baseUrl, data);
  }
}
