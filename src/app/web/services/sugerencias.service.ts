import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Variables globales
import { environment } from '../../../environments/environment';


// Asigno de variable global
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SugerenciasService {

  constructor(private http: HttpClient) { }

  public store(formData: any) {
    return this.http.post(`${base_url}/api/sugerencia/save`, formData);
  }
}
