// Variables globales
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class GacetaService {

  constructor(private http: HttpClient) { }

  obtenerDocumentos(limite: number, page: number, tipo: number, search: string): Observable<any> {
    const url = `${base_url}/api/legales/documentos?limite=${limite}&page=${page}&tipo=${tipo}&search=${search}`;

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