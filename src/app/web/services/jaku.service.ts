import { Injectable } from '@angular/core';


import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
const base_url = environment.base_url;

@Injectable({
    providedIn: 'root'
})
export class JakuService {

    constructor(private http: HttpClient) { }

    /**
    * index
    */
    public getGobernaciontv() {
        return this.http.get(`${base_url}/api/gobernaciontv/gobertv`);
        // http://localhost:8000/api/multimedia/geleria/1
    }
}