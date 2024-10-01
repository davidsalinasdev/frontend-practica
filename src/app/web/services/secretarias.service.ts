import { Injectable } from '@angular/core';


import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SecretariasService {

  constructor(private http: HttpClient) { }

  /**
  * index
  */
  public indexSecretarias() {
    return this.http.get(`${base_url}/api/inicio/getSecretarias`);
    // https://gobernaciondecochabamba.bo/api/plan/planes
  }

  /**
   * showSecretaria
   */
  public showSecretaria(id: any) {

    return this.http.get(`${base_url}/api/secretaria/ver/${id}`);
    // http://127.0.0.1:8000/api/secretaria/ver/7
  }

}