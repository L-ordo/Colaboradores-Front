import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Muninicipios } from '../interfaces/municipes.interface';

@Injectable({
  providedIn: 'root'
})
export class MunicipioService {
 

  private http = inject(HttpClient);
    baseUrl = 'http://127.0.0.1:8000/api/municipios';
    
  getMunicipios(): Observable<Muninicipios[]> {
    return this.http.get<Muninicipios[]>(this.baseUrl);
  }

  constructor() { }
}
