import { Component, OnInit } from '@angular/core';
import { AuditoriaService } from '../../services/auditoria.service';

@Component({
  selector: 'app-auditoria',
  templateUrl: './auditoria.component.html',
  styleUrl: './auditoria.component.css'
})
export class AuditoriaComponent implements OnInit {

  documentos: any[] = [];
  totalItems: number = 0; // Total de elementos
  limite: number = 9; // Número de elementos por página
  page: number = 1; // Página actual
  search: string = ''; // Filtro de búsqueda, si es necesario
  buscador: string = ''; // Filtro de búsqueda, si es necesario

  constructor(private auditoriaServices: AuditoriaService) { }

  ngOnInit(): void {
    this.obtenerDocumentos();
  }

  obtenerDocumentos(): void {
    this.auditoriaServices.obtenerDocumentos(this.limite, this.page, this.search)
      .subscribe(response => {
        console.log(response);
        this.documentos = response.data.data;
        this.totalItems = response.data.total;  // Total de documentos
      });
  }

  pageChanged(event: number): void {
    this.page = event;
    this.obtenerDocumentos();
  }

  buscar(): void {
    this.page = 1;  // Reiniciar a la primera página al buscar
    this.obtenerDocumentos();
  }
}