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
  opcionAuditoria: boolean = false;

  constructor(private auditoriaServices: AuditoriaService) { }

  ngOnInit(): void {
    this.obtenerDocumentos();
  }

  obtenerDocumentos(): void {
    this.auditoriaServices.obtenerDocumentos(this.limite, this.page, this.search)
      .subscribe(response => {
        // console.log(response);
        this.documentos = response.data.data;
        this.totalItems = response.data.total;  // Total de documentos

        this.opcionAuditoria = false;
        if (this.documentos.length === 0) {
          this.opcionAuditoria = true;
        }

      });
  }

  pageChanged(event: number): void {
    this.page = event;
    this.obtenerDocumentos();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  buscar(): void {
    this.page = 1;  // Reiniciar a la primera página al buscar
    this.obtenerDocumentos();
  }
}