import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class RendicionService {

  constructor(private http: HttpClient) { }

  obtenerDocumentos(limite: number, page: number, search: string): Observable<any> {

    const url = `${base_url}/api/unidad/rendicioncuentas/2?limite=${limite}&page=${page}&search=${search}`;
    // https://gobernaciondecochabamba.bo/api/unidad/rendicioncuentas/2?limite=10&search=&page=1

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