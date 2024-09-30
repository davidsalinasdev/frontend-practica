import { Component } from '@angular/core';
import { DetalleNoticiasService } from '../../services/detalle-noticias.service';
import { ActivatedRoute } from '@angular/router';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle-noticias',
  templateUrl: './detalle-noticias.component.html',
  styleUrl: './detalle-noticias.component.css'
})
export class DetalleNoticiasComponent {

  public titulo: string | null = '';
  public individual: string | null = '';
  public categoriaQuery: string | null = '';

  public alerta: boolean = true;


  totalItems: number = 0; // Total de elementos
  limite: number = 10; // Número de elementos por página
  page: number = 1; // Página actual
  search: string | null = ''; // Filtro de búsqueda, si es necesario
  categoria: string | null = ''; // Filtro de búsqueda, si es necesario
  palabra: string = ''; // Filtro de búsqueda, si es necesario



  public menuEspecial: any[] = [];
  public categoriaNoticias: any[] = [];
  public listaNoticias: any[] = [];

  constructor(
    private detalleNoticiasServices: DetalleNoticiasService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {
    // Mover la página a la parte superior
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Recibiendo parametro
    this.recibiendoTitulo();

  }


  ngOnInit(): void {
    this.indexMenuEspecial();
    this.indexCategoriaNoticias();
    this.indexListaNoticias();
  }


  /**
   * recibiendoTitulo
   */
  public recibiendoTitulo() {
    // Suscribirse a los cambios en los parámetros de la ruta
    this.activatedRoute.paramMap.subscribe(params => {
      this.titulo = params.get('otroParametro'); // Obtener el valor del parámetro 'id'

      this.individual = params.get('titulo');
      this.categoriaQuery = params.get('titulo');



      if (this.titulo === 'individual') {
        this.search = this.individual;

      }
      if (this.titulo === 'categoria') {
        this.categoria = this.categoriaQuery;
      }

      // y para todos es ultimo


    });
  }


  /**
   * indexMenuEspecial
   */
  public indexMenuEspecial() {
    this.detalleNoticiasServices.obtenerMenuespecial()
      .subscribe((resp: any) => {
        const { data } = resp;
        this.menuEspecial = data;
        // console.log(this.menuEspecial);

      })
  }

  /**
   * indexCategoriaNoticias
   */
  public indexCategoriaNoticias() {
    this.detalleNoticiasServices.obtenerCategorias()
      .subscribe((resp: any) => {
        const { data } = resp;
        this.categoriaNoticias = data.categorias;
        // console.log(this.categoriaNoticias);

      })
  }

  /**
   * indexListaNoticias
   */
  public indexListaNoticias() {
    this.detalleNoticiasServices.obtenerListaNoticias(this.categoria, this.palabra, this.search, this.page)
      .subscribe((resp: any) => {
        const { data } = resp;

        // Sanitizar el contenido HTML de cada noticia
        this.listaNoticias = data.data.map((noticia: any) => {
          return {
            ...noticia,  // Mantener otros campos intactos
            contenido: this.sanitizer.bypassSecurityTrustHtml(noticia.contenido)  // Sanitizar contenido HTML
          };
        });
        this.totalItems = data.total;  // Total de documentos
      });
  }

  /**
   * verMas
   */
  public verMas(titulo: string) {
    // Navegar a la nueva ruta
    this.router.navigate(['/web/detalle-noticias', titulo, 'individual'])
      .then(() => {
        // Recargar la página después de la navegación
        window.location.reload();
      });
  }

  public ultimas() {
    // Navegar a la nueva ruta
    this.router.navigate(['/web/detalle-noticias', 'ultimas', 'ultimas'])
      .then(() => {
        // Recargar la página después de la navegación
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.location.reload();
      });
  }

  public verCategorias(categoria: string) {
    // Navegar a la nueva ruta
    this.router.navigate(['/web/detalle-noticias', categoria, 'categoria'])
      .then(() => {
        // Recargar la página después de la navegación
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.location.reload();
      });
  }


  pageChanged(event: number): void {
    this.page = event;
    this.indexListaNoticias();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Mover la página a la parte superior
  }

  /**
   * buscarNoticias
   */
  public buscarNoticias() {

    const buscar = document.getElementById('search-input') as HTMLInputElement;


    if (buscar.value === '' || buscar.value === null) {
      this.alerta = false;

      setTimeout(() => {
        this.alerta = true;
      }, 3000);

    } else {
      this.alerta = true;
      // Navegar a la nueva ruta
      this.router.navigate(['/web/detalle-noticias', buscar.value, 'individual'])
        .then(() => {
          // Recargar la página después de la navegación
          window.scrollTo({ top: 0, behavior: 'smooth' });
          window.location.reload();
        });
    }


  }

}
