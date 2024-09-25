import { Component, OnInit } from '@angular/core';
import { MediatekaService } from '../../services/mediateka.service';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-mediateka',
  templateUrl: './mediateka.component.html',
  styleUrl: './mediateka.component.css'
})
export class MediatekaComponent implements OnInit {

  tipoDocumento: number = 3;  // Tipo de documento por defecto
  documentos: any[] = [];
  totalItems: number = 0; // Total de elementos
  limite: number = 9; // Número de elementos por página
  page: number = 1; // Página actual
  search: string = ''; // Filtro de búsqueda, si es necesario
  buscador: string = ''; // Filtro de búsqueda, si es necesario

  opcionGaceta: boolean = false;

  constructor(
    private mediatecaServices: MediatekaService,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.obtenerDocumentos();
  }


  // Método para obtener los documentos desde el servicio
  obtenerDocumentos(): void {
    this.mediatecaServices.obtenerDocumentos(this.limite, this.page, this.tipoDocumento, this.search)
      .subscribe(response => {
        this.documentos = response.data.data.map((doc: any) => {
          doc.linkDescarga = this.convertirUrlYoutube(doc.linkDescarga); // Convertimos la URL a formato embed
          return doc;
        });
        this.totalItems = response.data.total;  // Total de documentos
      });
  }

  // Método para transformar las URLs de YouTube al formato de "embed"
  convertirUrlYoutube(link: string): SafeResourceUrl {
    const videoId = link.split('v=')[1]?.split('&')[0];  // Extrae el ID del video
    const embedUrl = `https://www.youtube.com/embed/${videoId}?controls=1`;  // Agrega el parámetro controls=1
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);  // Devuelve la URL segura
  }



  cambiarTipo(tipo: number): void {
    this.tipoDocumento = tipo;
    this.page = 1;  // Reiniciar a la primera página
    this.obtenerDocumentos();
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