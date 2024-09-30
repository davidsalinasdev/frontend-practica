import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class DetalleNoticiasService {


  constructor(private http: HttpClient) { }

  obtenerMenuespecial(): Observable<any> {

    const url = `${base_url}/api/inicio/getMenuEspecial`;


    // Petición GET con manejo de errores
    return this.http.get(url).pipe(
      catchError(this.handleError) // Manejo de errores
    );
  }

  obtenerCategorias(): Observable<any> {

    const url = `${base_url}/api/noticia/getCategoriasPalabrasClave`;


    // Petición GET con manejo de errores
    return this.http.get(url).pipe(
      catchError(this.handleError) // Manejo de errores
    );
  }

  // obtenerListaNoticias(limite: number, page: number, tipo: number, search: string): Observable<any> {
  obtenerListaNoticias(categoria: any, palabra: any, search: any, page: any): Observable<any> {

    const url = `${base_url}/api/noticia/noticias?categoria=${categoria}&palabra=${palabra}&search=${search}&page=${page}`;
    // https://gobernaciondecochabamba.bo/api/noticia/noticias?categoria=veh%C3%ADculos&palabra=&search=&page=1

    // Petición GET con manejo de errores
    return this.http.get(url).pipe(
      catchError(this.handleError) // Manejo de errores
    );

  }


  // Manejo de errores
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      console.error('Ocurrió un error:', error.error.message);
    } else {
      // Error del lado del servidor
      console.error(
        `Código del error ${error.status}, ` +
        `Error: ${error.error}`);
    }
    return throwError('Ocurrió un problema, intenta nuevamente más tarde.');
  }
}
