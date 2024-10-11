import { Component, AfterViewInit } from '@angular/core';
import { SemanarioService } from '../../services/semanario.service';
import { DomSanitizer } from '@angular/platform-browser';


// jquery en angular
declare var $: any;

@Component({
  selector: 'app-semanario',
  templateUrl: './semanario.component.html',
  styleUrls: ['./semanario.component.css']
})
export class SemanarioComponent implements AfterViewInit {

  tipoDocumento: number = 3;
  documentos: any[] = [];
  totalItems: number = 0;
  limite: number = 3;
  page: number = 1;
  search: string = '';
  urlServidor: string = '';
  urlPortada: string = '';
  libroImagenes: any[] = [];
  libroImagenesPairs: any[][] = [];  // Pares de imágenes
  currentState: number = 1;
  numOfPapers: number = 0;
  maxState: number = 0;

  private prevBtn!: HTMLElement;
  private nextBtn!: HTMLElement;
  private book!: HTMLElement;

  constructor(
    private semanarioServices: SemanarioService,
    private sanitizer: DomSanitizer
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

        this.libroImagenes = this.documentos[2].img_semanarios.map((img: any) => ({
          ...img,
          fullUrl: this.sanitizer.bypassSecurityTrustResourceUrl(this.urlPortada + '/' + img.imagen),
          edicion: this.documentos[0].edicion,
          fecha_publicacion: this.documentos[0].fecha_publicacion,
        }));

        // Crear pares de imágenes para cada paper
        this.libroImagenesPairs = this.chunkArray(this.libroImagenes, 2);

        // Calcular número de papers y máximo estado
        this.numOfPapers = this.libroImagenesPairs.length;
        this.maxState = this.numOfPapers + 1;

        console.log(this.libroImagenesPairs);
      });
  }

  ngAfterViewInit() {
    this.prevBtn = document.querySelector('#prev-btn')!;
    this.nextBtn = document.querySelector('#next-btn')!;
    this.book = document.querySelector('#book')!;

    this.prevBtn.addEventListener('click', () => this.goPrevious());
    this.nextBtn.addEventListener('click', () => this.goNext());
  }

  private openBook() {
    this.book.style.transform = "translateX(50%)";
    this.prevBtn.style.transform = "translateX(-180px)";
    this.nextBtn.style.transform = "translateX(180px)";
  }

  private closeBook(isFirstPage: boolean) {
    if (isFirstPage) {
      this.book.style.transform = "translateX(0%)";
    } else {
      this.book.style.transform = "translateX(100%)";
    }
    this.prevBtn.style.transform = "translateX(0px)";
    this.nextBtn.style.transform = "translateX(0px)";
  }

  private goNext() {
    if (this.currentState < this.maxState) {
      const paper = document.querySelector(`#p${this.currentState}`) as HTMLElement;

      if (paper) {
        paper.classList.add("flipped");
        paper.style.zIndex = `${this.currentState}`;
      }

      if (this.currentState === 1) {
        this.openBook();
      }

      this.currentState++;
    }
  }

  private goPrevious() {
    if (this.currentState > 1) {
      this.currentState--;

      const paper = document.querySelector(`#p${this.currentState}`) as HTMLElement;

      if (paper) {
        paper.classList.remove("flipped");
        paper.style.zIndex = `${this.maxState - this.currentState}`;
      }

      if (this.currentState === 1) {
        this.closeBook(true);
      }
    }
  }

  private chunkArray(array: any[], size: number): any[][] {
    const chunkedArr: any[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArr.push(array.slice(i, i + size));
    }
    return chunkedArr;
  }

  /**
 * verSeminario
 */
  public verSemanario(doc: any) {
    // Mover la página a la parte superior
    window.scrollTo({ top: 0, behavior: 'smooth' });

    this.libroImagenes = [];

    this.libroImagenes = doc.img_semanarios.map((img: any) => ({
      ...img,
      fullUrl: this.sanitizer.bypassSecurityTrustResourceUrl(this.urlPortada + '/' + img.imagen),
      edicion: this.documentos[0].edicion,
      fecha_publicacion: this.documentos[0].fecha_publicacion,
    }));

    // Crear pares de imágenes para cada paper
    this.libroImagenesPairs = this.chunkArray(this.libroImagenes, 2);

    // Calcular número de papers y máximo estado
    this.numOfPapers = this.libroImagenesPairs.length;
    this.maxState = this.numOfPapers + 1;

    // Muestra el modal
    $('#modalSemanario').modal('show');

  }

  pageChanged(event: number): void {
    this.page = event;
    this.obtenerDocumentos();
  }
}
