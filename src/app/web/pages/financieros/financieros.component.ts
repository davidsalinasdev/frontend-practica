import { Component, OnInit } from '@angular/core';
import { RendicionService } from '../../services/rendicion.service';


@Component({
  selector: 'app-financieros',
  templateUrl: './financieros.component.html',
  styleUrls: ['./financieros.component.css']
})
export class FinancierosComponent implements OnInit {

  documentos: any[] = [];
  totalItems: number = 0; // Total de elementos
  limite: number = 9; // Número de elementos por página
  page: number = 1; // Página actual
  search: string = ''; // Filtro de búsqueda, si es necesario
  buscador: string = ''; // Filtro de búsqueda, si es necesario
  opcionAuditoria: boolean = false;

  constructor(private rendicionServices: RendicionService) { }

  ngOnInit(): void {
    this.obtenerDocumentos();
  }

  obtenerDocumentos(): void {
    this.rendicionServices.obtenerDocumentos(this.limite, this.page, this.search)
      .subscribe(response => {

        this.documentos = response.data.data.filter(
          (doc: any) => doc.tipo_documento === 'estados_financieros'
        );

        this.totalItems = this.documentos.length;

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