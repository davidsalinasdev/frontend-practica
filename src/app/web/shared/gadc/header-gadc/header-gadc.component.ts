import { Component } from '@angular/core';
import { InicioService } from '../../../services/inicio.service';
// Importa Bootstrap
import { DomSanitizer } from '@angular/platform-browser';

import * as bootstrap from 'bootstrap';
import { environment } from '../../../../../environments/environment';
const base_url = environment.base_url;

@Component({
  selector: 'app-header-gadc',
  templateUrl: './header-gadc.component.html',
  styleUrl: './header-gadc.component.css'
})
export class HeaderGadcComponent {
  public listBanners: any = [];
  public baseUrl: string = base_url

  constructor(private inicioServices: InicioService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.indexBaners();
  }

  /**
 * indexBaners
 */
  public indexBaners() {
    this.inicioServices.indexCarrusel().subscribe({
      next: (resp: any) => {

        const { data } = resp;
        this.listBanners = data;

        this.listBanners = data.map((banner: any) => {
          // Sanitiza la URL del video
          if (banner.tipoArchivo === 'video') {
            banner.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
              `${this.baseUrl}/storage/uploads/${banner.videoBanner}`
            );
          }
          return banner;
        });

        console.log(this.listBanners[0]?.videoUrl);


      },
      error: (err) => {
        console.log(err);
      },
      complete: () => { }
    })
  }
  ngAfterViewInit(): void {
    // Obtener el elemento del carrusel
    const carouselElement = document.querySelector('#carouselExampleIndicators2');

    // Verificar que el elemento no sea null
    if (carouselElement) {
      // Inicializar el carrusel con el elemento
      const carousel = new bootstrap.Carousel(carouselElement, {
        interval: 3000,  // Cambiar de imagen cada 3 segundos
        ride: 'carousel'
      });
    } else {
      console.error('El elemento del carrusel no fue encontrado');
    }
  }

}
