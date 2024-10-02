import { Component, OnInit } from '@angular/core';
import { ConvocatoriasService } from '../../services/convocatorias.service';

@Component({
  selector: 'app-convocatorias',
  templateUrl: './convocatorias.component.html',
  styleUrl: './convocatorias.component.css'
})
export class ConvocatoriasComponent implements OnInit {

  documentos: any[] = [];
  totalItems: number = 0; // Total de elementos
  limite: number = 10; // Número de elementos por página
  page: number = 1; // Página actual
  search: string = ''; // Filtro de búsqueda, si es necesario
  buscador: string = ''; // Filtro de búsqueda, si es necesario
  opcionAuditoria: boolean = false;

  constructor(private convocatoriaServices: ConvocatoriasService) { }

  ngOnInit(): void {
    this.obtenerDocumentos();
  }

  obtenerDocumentos(): void {
    this.convocatoriaServices.obtenerDocumentos(this.limite, this.page, this.search)
      .subscribe(response => {
        console.log(response);
        this.documentos = response.data.data;
        this.totalItems = response.data.total;  // Total de documentos

        this.opcionAuditoria = false;
        console.log(this.documentos.length);

        if (this.documentos.length >= 0 && this.documentos.length <= 2) {
          this.opcionAuditoria = true;
        }

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
