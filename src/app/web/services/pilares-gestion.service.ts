import { Injectable } from '@angular/core';


import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class PilaresGestionService {

  constructor(private http: HttpClient) { }

  /**
  * index
  */
  public indexPilaresGestion() {
    return this.http.get(`${base_url}/api/plan/planes`);
    // https://gobernaciondecochabamba.bo/api/plan/planes
  }
}