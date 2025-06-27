import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Collaborator } from '../interfaces/collaborator.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorServiceService {

  constructor() { }


  baseUrl = 'http://127.0.0.1:8000/api/colaboradores';

  private http = inject(HttpClient);
  private router = inject(Router);
  //obtener todos los colaboradores
  getCollaborator(): Observable<Collaborator[]> {
    return this.http.get<Collaborator[]>(`${this.baseUrl}`);
  }

  //actualizar un colaborador
  updateCollaborator(id: number, colaborador: Collaborator): Observable<Collaborator> {
    return this.http.put<Collaborator>(`${this.baseUrl}/${id}`, colaborador);
  }
  //crear un colaborador
  createCollaborator(colaborador: Collaborator): Observable<Collaborator> {
    return this.http.post<Collaborator>(`${this.baseUrl}`, colaborador);
  }

  //eliminar un colaborador
  deleteCollaborator(id: number): Observable<Collaborator> {
    return this.http.delete<Collaborator>(`${this.baseUrl}/${id}`);
  }
  

}
