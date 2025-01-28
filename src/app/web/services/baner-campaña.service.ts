import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Variables globales
import { environment } from '../../../environments/environment';

// Modelos
// import { Persona } from '../models/persona';

// Asigno de variable global
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BanerCampañaService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * index
   */
  public getBannerCampania(id: any) {
    return this.http.get(`${base_url}/api/bannercampania/listbannercampania/${id}`);
  }

  public getIndexCampania(id: any) {
    return this.http.get(`${base_url}/api/bannercampania/getbannercampania/${id}`);
  }

  public getCampania(id: any) {
    return this.http.get(`${base_url}/api/bannercampania/getcampania/${id}`);
  }
}
