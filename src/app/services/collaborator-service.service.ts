import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorServiceService {

  constructor() { }


  baseUrl = 'http://127.0.0.1:8000/api';

  private http = inject(HttpClient);
  private router = inject(Router);

  getCollaborators() {
    return this.http.get(`${this.baseUrl}/colaboradores`);
  }

}
