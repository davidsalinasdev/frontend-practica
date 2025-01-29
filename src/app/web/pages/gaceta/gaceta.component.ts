import { Component, OnInit } from '@angular/core';
import { GacetaService } from '../../services/gaceta.service';
import { ActivatedRoute } from '@angular/router';

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

  public params!: string;

  opcionGaceta: boolean = false;

  constructor(
    private gacetaServices: GacetaService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // this.obtenerDocumentos();
    // Suscribirse para capturar el parámetro de la URL
    this.route.paramMap.subscribe(tipo => {
      this.params = tipo.get('tipo') || '';

      this.tipoDocumento = Number(this.params);
      // Optenemos la lista de leyes y decretos segun tipo
      this.obtenerDocumentosDesdeMenu(this.params);


    });
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

  obtenerDocumentosDesdeMenu(tipo: any): void {
    this.gacetaServices.obtenerDocumentos(this.limite, this.page, tipo, this.search)
      .subscribe(response => {

        this.documentos = [];

        this.opcionGaceta = false;

        this.documentos = response.data.data;

        // console.log(this.documentos);

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