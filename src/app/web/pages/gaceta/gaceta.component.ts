import { Component, OnInit } from '@angular/core';
import { GacetaService } from '../../services/gaceta.service';

@Component({
  selector: 'app-gaceta',
  templateUrl: './gaceta.component.html',
  styleUrl: './gaceta.component.css'
})
export class GacetaComponent implements OnInit {

  tipoDocumento: number = 3;  // Tipo de documento por defecto
  documentos: any[] = [];
  totalItems: number = 0; // Total de elementos
  limite: number = 12; // Número de elementos por página
  page: number = 1; // Página actual
  search: string = ''; // Filtro de búsqueda, si es necesario
  buscador: string = ''; // Filtro de búsqueda, si es necesario

  opcionGaceta: boolean = false;

  constructor(private gacetaServices: GacetaService) { }

  ngOnInit(): void {
    this.obtenerDocumentos();
  }

  obtenerDocumentos(): void {
    this.gacetaServices.obtenerDocumentos(this.limite, this.page, this.tipoDocumento, this.search)
      .subscribe(response => {

        this.opcionGaceta = false;

        this.documentos = response.data.data;
        this.totalItems = response.data.total;  // Total de documentos

        if (this.documentos.length === 0) {
          this.opcionGaceta = true;
        }

      });
  }

  cambiarTipo(tipo: number): void {
    this.tipoDocumento = tipo;
    this.page = 1;  // Reiniciar a la primera página
    this.obtenerDocumentos();
  }

  pageChanged(event: number): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.page = event;
    this.obtenerDocumentos();
  }

  buscar(): void {
    this.page = 1;  // Reiniciar a la primera página al buscar
    this.obtenerDocumentos();
  }
}