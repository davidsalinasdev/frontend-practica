import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';

declare var $: any; // Importar jQuery

import 'turn.js';
import { SemanarioService } from '../../services/semanario.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-semanario',
  templateUrl: './semanario.component.html',
  styleUrls: ['./semanario.component.css']
})
export class SemanarioComponent implements AfterViewInit, AfterViewChecked {

  tipoDocumento: number = 3;
  documentos: any[] = [];
  totalItems: number = 0;
  limite: number = 3;
  page: number = 1;
  search: string = '';
  buscador: string = '';
  urlServidor: string = '';
  urlPortada: string = '';
  libroImagenes: any[] = [];
  flipbookInitialized: boolean = false;  // Nuevo flag

  constructor(
    private http: HttpClient,
    private semanarioServices: SemanarioService,
    private sanitizer: DomSanitizer, // Inyectar DomSanitizer
    private cdr: ChangeDetectorRef // Inyectar ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.obtenerDocumentos();
  }

  obtenerDocumentos(): void {
    this.semanarioServices.obtenerDocumentos(this.limite, this.page, this.tipoDocumento, this.search)
      .subscribe(response => {
        this.documentos = response.data.data;
        this.totalItems = response.data.total;
        this.urlPortada = response.bgImage;


        this.libroImagenes = this.documentos[0].img_semanarios.map((img: any) => ({
          ...img,
          fullUrl: this.sanitizer.bypassSecurityTrustResourceUrl(this.urlPortada + '/' + img.imagen),
          edicion: this.documentos[0].edicion,
          fecha_publicacion: this.documentos[0].fecha_publicacion,
        }));
      });
  }

  /**
   * verSeminario
   */
  public verSemanario(doc: any) {


    this.libroImagenes = [];

    this.libroImagenes = doc.img_semanarios.map((img: any) => ({
      ...img,
      fullUrl: this.urlPortada + '/' + img.imagen,
      edicion: doc.edicion,
      fecha_publicacion: doc.fecha_publicacion,
    }));

    this.cdr.detectChanges(); // Forzar la detección de cambios
    this.initFlipbook(); // Llama a initFlipbook
    console.log(this.libroImagenes);

  }



  ngAfterViewInit() {
    window.addEventListener('resize', this.initFlipbook.bind(this));
  }

  ngAfterViewChecked() {
    // Verifica si ya se renderizaron las imágenes y si el flipbook no está inicializado
    if (!this.flipbookInitialized && this.libroImagenes.length > 0 && $('#flipbook .page').length > 0) {
      this.initFlipbook();
      this.flipbookInitialized = true;  // Marcar como inicializado
    }
  }

  initFlipbook() {
    const flipbookElement = $('#flipbook');

    flipbookElement.turn({
      width: Math.min(window.innerWidth * 0.9, 1150),
      height: Math.min(window.innerHeight * 0.8, 680),
      autoCenter: false,
      duration: 1000,
      elevation: 50,
      gradients: true
    });

    $('#prev').on('click', function () {
      const flipbookElement = $('#flipbook');
      // Asegúrate de que el contenedor esté vacío
      flipbookElement.empty(); // Limpia el contenido anterior

      flipbookElement.turn('previous');
    });

    $('#next').on('click', function () {
      const flipbookElement = $('#flipbook');
      // Asegúrate de que el contenedor esté vacío
      flipbookElement.empty(); // Limpia el contenido anterior
      this.initFlipbook(); // Llama a initFlipbook
      flipbookElement.turn('next');
    });
  }

  pageChanged(event: number): void {
    this.page = event;
    this.obtenerDocumentos();
  }
}